import urllib.request as urllib
import json
import time
from sklearn.cluster import KMeans
from adtk.data import validate_series
from adtk.detector import QuantileAD
from adtk.detector import PersistAD
from adtk.detector import ThresholdAD
from adtk.detector import LevelShiftAD
from adtk.detector import MinClusterDetector
import pandas as pd
from datetime import datetime
from dateutil import tz
import smtplib
READ_API_KEY='   '
CHANNEL_ID= '    '

GMAIL_ID = 'smartfarming2589@gmail.com'
GMAIL_PSWD = 'cfhdcgqrswtqiott'


# def send_msg_on_telegram(msg):
#     telegram_api_url = f"https://api.telegram.org/bot{tele_auth_token}/sendMessage?chat_id=@{tel_group_id}&text={msg}"
#     tel_resp = requests.get(telegram_api_url)

#     if tel_resp.status_code == 200:
#         print ("Notification has been sent on Telegram")
#     else:
#         print ("Could not send Message")

def sendEmail(to,sub,msg):
    print(f"Email to {to} sent with subject: {sub} and message {msg}")
    s = smtplib.SMTP('smtp.gmail.com',587)
    s.starttls()
    s.login(GMAIL_ID,GMAIL_PSWD)

    s.sendmail(GMAIL_ID,to,f"Subject: {sub}\n\n{msg}")
    s.quit()

def test():

    TS = urllib.urlopen("https://api.thingspeak.com/channels/1837496/feeds.json?api_key=ZPJ8PYOOKBVK4DQT&results=1")
    TD = urllib.urlopen("https://api.thingspeak.com/channels/1837496/feeds.json?api_key=ZPJ8PYOOKBVK4DQT&results=5000")
    response = TS.read()
    data=json.loads(response)
    td_res = TD.read()
    td_data = json.loads(td_res)
    data1 = []
    data2 = []
    data3 = []
    data4 = []
    data5 = []
    data6 = []
    time1 = []
    anom_num = [[0 for i in range(5)] for i in range(6)]
    now_timestamp = time.time()
    offset = datetime.fromtimestamp(now_timestamp) - datetime.utcfromtimestamp(now_timestamp)
    for i in range(5000):
        t = pd.to_datetime(td_data['feeds'][i]['created_at']) + offset
        data1.append((float)(td_data['feeds'][i]['field1'])) 
        data2.append((float)(td_data['feeds'][i]['field2'])) 
        data3.append((float)(td_data['feeds'][i]['field3'])) 
        data4.append((float)(td_data['feeds'][i]['field4'])) 
        data5.append((float)(td_data['feeds'][i]['field5'])) 
        data6.append((float)(td_data['feeds'][i]['field6'])) 
        time1.append(t)
    data1 = pd.Series(data1, index=time1)
    data2 = pd.Series(data2, index=time1)
    data3 = pd.Series(data3, index=time1)
    data4 = pd.Series(data4, index=time1)
    data5 = pd.Series(data5, index=time1)
    data6 = pd.Series(data6, index=time1)
    s1 = validate_series(data1)
    s2 = validate_series(data2)
    s3 = validate_series(data3)
    s4 = validate_series(data4)
    s5 = validate_series(data5)
    s6 = validate_series(data6)
    levelshift_ad = LevelShiftAD(c = 6.0, window = 20)
    anomalies11 = levelshift_ad.fit_detect(s1)
    anomaly_values11 = anomalies11[anomalies11.values == True].index
    anomalies12 = levelshift_ad.fit_detect(s2)
    anomaly_values12 = anomalies12[anomalies12.values == True].index
    anomalies13 = levelshift_ad.fit_detect(s3)
    anomaly_values13 = anomalies13[anomalies13.values == True].index
    anomalies14 = levelshift_ad.fit_detect(s4)
    anomaly_values14 = anomalies14[anomalies14.values == True].index
    anomalies15 = levelshift_ad.fit_detect(s5)
    anomaly_values15 = anomalies15[anomalies15.values == True].index
    anomalies16 = levelshift_ad.fit_detect(s6)
    anomaly_values16 = anomalies16[anomalies16.values == True].index
    persist_ad = PersistAD()
    anomalies21 = persist_ad.fit_detect(s1)
    anomaly_values21 = anomalies21[anomalies21.values == True].index
    anomalies22 = persist_ad.fit_detect(s2)
    anomaly_values22 = anomalies22[anomalies22.values == True].index
    anomalies23 = persist_ad.fit_detect(s3)
    anomaly_values23 = anomalies23[anomalies23.values == True].index
    anomalies24 = persist_ad.fit_detect(s4)
    anomaly_values24 = anomalies24[anomalies24.values == True].index
    anomalies25 = persist_ad.fit_detect(s5)
    anomaly_values25 = anomalies25[anomalies25.values == True].index
    anomalies26 = persist_ad.fit_detect(s6)
    anomaly_values26 = anomalies26[anomalies26.values == True].index
    quantile_ad = QuantileAD(high = 0.99)
    anomalies31 = quantile_ad.fit_detect(s1)
    anomaly_values31 = anomalies31[anomalies31.values == True].index
    anomalies32 = quantile_ad.fit_detect(s2)
    anomaly_values32 = anomalies32[anomalies32.values == True].index
    anomalies33 = quantile_ad.fit_detect(s3)
    anomaly_values33 = anomalies33[anomalies33.values == True].index
    anomalies34 = quantile_ad.fit_detect(s4)
    anomaly_values34 = anomalies34[anomalies34.values == True].index
    anomalies35 = quantile_ad.fit_detect(s5)
    anomaly_values35 = anomalies35[anomalies35.values == True].index
    anomalies36 = quantile_ad.fit_detect(s6)
    anomaly_values36 = anomalies36[anomalies36.values == True].index
    threshold_ad = ThresholdAD(high = 1000)
    anomalies41 = threshold_ad.detect(s1)
    anomaly_values41 = anomalies41[anomalies41.values == True].index
    threshold_ad = ThresholdAD(high = 20)
    anomalies42 = threshold_ad.detect(s2)
    anomaly_values42 = anomalies42[anomalies42.values == True].index
    threshold_ad = ThresholdAD(high = 50, low = 5)
    anomalies43 = threshold_ad.detect(s3)
    anomaly_values43 = anomalies43[anomalies43.values == True].index
    threshold_ad = ThresholdAD(high = 100, low = 50)
    anomalies44 = threshold_ad.detect(s4)
    anomaly_values44 = anomalies44[anomalies44.values == True].index
    threshold_ad = ThresholdAD(high = 10000, low = 0)
    anomalies45 = threshold_ad.detect(s5)
    anomaly_values45 = anomalies45[anomalies45.values == True].index
    threshold_ad = ThresholdAD(high = 100, low = 0)
    anomalies46 = threshold_ad.detect(s6)
    anomaly_values46 = anomalies46[anomalies46.values == True].index
    minclusterdetector_ad = MinClusterDetector(KMeans(n_clusters=3))
    anomalies51 = minclusterdetector_ad.fit_detect(pd.DataFrame(s1))
    anomaly_values51 = anomalies51[anomalies51.values == True].index
    anomalies52 = minclusterdetector_ad.fit_detect(pd.DataFrame(s2))
    anomaly_values52 = anomalies52[anomalies52.values == True].index
    anomalies53 = minclusterdetector_ad.fit_detect(pd.DataFrame(s3))
    anomaly_values53 = anomalies53[anomalies53.values == True].index
    anomalies54 = minclusterdetector_ad.fit_detect(pd.DataFrame(s4))
    anomaly_values54 = anomalies54[anomalies54.values == True].index
    anomalies55 = minclusterdetector_ad.fit_detect(pd.DataFrame(s5))
    anomaly_values55 = anomalies55[anomalies55.values == True].index
    anomalies56 = minclusterdetector_ad.fit_detect(pd.DataFrame(s6))
    anomaly_values56 = anomalies56[anomalies56.values == True].index
    now_timestamp = time.time()
    offset = datetime.fromtimestamp(now_timestamp) - datetime.utcfromtimestamp(now_timestamp)
    check = pd.to_datetime(data['feeds'][0]['created_at']) + offset
    num_anom = [0 for i in range(6)]
    if(len(anomaly_values11)>0):
        if(check==anomaly_values11[- 1]):
            num_anom[0] = num_anom[0] + 1
            anom_num[0][0] = 1
            pass
    if(len(anomaly_values21)>0):
        if(check==anomaly_values21[- 1]):
            num_anom[0] = num_anom[0] + 1
            anom_num[0][1] = 1
            pass
    if(len(anomaly_values31)>0):
        if(check==anomaly_values31[- 1]):
            num_anom[0] = num_anom[0] + 1
            anom_num[0][2] = 1
            pass
    if(len(anomaly_values41)>0):
        if(check==anomaly_values41[- 1]):
            num_anom[0] = num_anom[0] + 1
            anom_num[0][3] = 1
            pass
    if(len(anomaly_values51)>0):
        if(check==anomaly_values51[- 1]):
            num_anom[0] = num_anom[0] + 1
            anom_num[0][4] = 1
            pass
    if(len(anomaly_values12)>0):
        if(check==anomaly_values12[- 1]):
            num_anom[1] = num_anom[1] + 1
            anom_num[1][0] = 1
            pass
    if(len(anomaly_values22)>0):
        if(check==anomaly_values22[- 1]):
            num_anom[1] = num_anom[1] + 1
            anom_num[1][1] = 1
            pass
    if(len(anomaly_values32)>0):
        if(check==anomaly_values32[- 1]):
            num_anom[1] = num_anom[1] + 1
            anom_num[1][2] = 1
            pass
    if(len(anomaly_values42)>0):
        if(check==anomaly_values42[- 1]):
            num_anom[1] = num_anom[1] + 1
            anom_num[1][3] = 1
            pass
    if(len(anomaly_values52)>0):
        if(check==anomaly_values52[- 1]):
            num_anom[1] = num_anom[1] + 1
            anom_num[1][4] = 1
            pass
    if(len(anomaly_values13)>0):
        if(check==anomaly_values13[- 1]):
            num_anom[2] = num_anom[2] + 1
            anom_num[2][0] = 1
            pass
    if(len(anomaly_values23)>0):
        if(check==anomaly_values23[- 1]):
            num_anom[2] = num_anom[2] + 1
            anom_num[2][1] = 1
            pass
    if(len(anomaly_values33)>0):
        if(check==anomaly_values33[- 1]):
            num_anom[2] = num_anom[2] + 1
            anom_num[2][2] = 1
            pass
    if(len(anomaly_values43)>0):
        if(check==anomaly_values43[- 1]):
            num_anom[2] = num_anom[2] + 1
            anom_num[2][3] = 1
            pass
    if(len(anomaly_values53)>0):
        if(check==anomaly_values53[- 1]):
            num_anom[2] = num_anom[2] + 1
            anom_num[2][4] = 1
            pass
    if(len(anomaly_values14)>0):
        if(check==anomaly_values14[- 1]):
            num_anom[3] = num_anom[3] + 1
            anom_num[3][0] = 1
            pass
    if(len(anomaly_values24)>0):
        if(check==anomaly_values24[- 1]):
            num_anom[3] = num_anom[3] + 1
            anom_num[3][1] = 1
            pass
    if(len(anomaly_values34)>0):
        if(check==anomaly_values34[- 1]):
            num_anom[3] = num_anom[3] + 1
            anom_num[3][2] = 1
            pass
    if(len(anomaly_values44)>0):
        if(check==anomaly_values44[- 1]):
            num_anom[3] = num_anom[3] + 1
            anom_num[3][3] = 1
            pass
    if(len(anomaly_values54)>0):
        if(check==anomaly_values54[- 1]):
            num_anom[3] = num_anom[3] + 1
            anom_num[3][4] = 1
            pass
    if(len(anomaly_values15)>0):
        if(check==anomaly_values15[- 1]):
            num_anom[4] = num_anom[4] + 1
            anom_num[4][0] = 1
            pass
    if(len(anomaly_values25)>0):
        if(check==anomaly_values25[- 1]):
            num_anom[4] = num_anom[4] + 1
            anom_num[4][1] = 1
            pass
    if(len(anomaly_values35)>0):
        if(check==anomaly_values35[- 1]):
            num_anom[4] = num_anom[4] + 1
            anom_num[4][2] = 1
            pass
    if(len(anomaly_values45)>0):
        if(check==anomaly_values45[- 1]):
            num_anom[4] = num_anom[4] + 1
            anom_num[4][3] = 1
            pass
    if(len(anomaly_values55)>0):
        if(check==anomaly_values55[- 1]):
            num_anom[4] = num_anom[4] + 1
            anom_num[4][4] = 1
            pass
    if(len(anomaly_values16)>0):
        if(check==anomaly_values16[- 1]):
            num_anom[5] = num_anom[5] + 1
            anom_num[5][0] = 1
            pass
    if(len(anomaly_values26)>0):
        if(check==anomaly_values26[- 1]):
            num_anom[5] = num_anom[5] + 1
            anom_num[5][1] = 1
            pass
    if(len(anomaly_values36)>0):
        if(check==anomaly_values36[- 1]):
            num_anom[5] = num_anom[5] + 1
            anom_num[5][2] = 1
            pass
    if(len(anomaly_values46)>0):
        if(check==anomaly_values46[- 1]):
            num_anom[5] = num_anom[5] + 1
            anom_num[5][3] = 1
            pass
    if(len(anomaly_values56)>0):
        if(check==anomaly_values56[- 1]):
            num_anom[5] = num_anom[5] + 1
            anom_num[5][4] = 1
            pass
    
    print("1")
    TS.close()
    TD.close()
    num_anom = [i * 100 /5 for i in num_anom]
    string = ''
    string1 = ['CO2', 'VOC', 'Temperature', 'Humidity', 'light', 'soil moisture']
    for i in range(6):
        if anom_num[i][0] == 1:
            string = string + '. There seems to be a shift in level of ' + string1[i]
        if anom_num[i][1] == 1:
            string = string + '. There seems to be an sudden spike of ' + string1[i]
        if anom_num[i][2] == 1:
            string = string + '. The level of ' + string1[i] + ' is towering'
        if anom_num[i][3] == 1:
            string = string + '. The levels detected of ' + string1[i] + ' exceeds the threshold value'
        if anom_num[i][4] == 1:
            string = string + '. The current level of ' + string1[i] + ' indicates an abnormality in received data'
    if num_anom[0] > 10 and num_anom[0] < 25:
        sendEmail("smartfarmingesw@gmail.com","Anomaly detected","Hi there! An anomaly was detected from the data with probability " + str(num_anom[0]) + ", it may not be something worrying" + string)
    if num_anom[0] > 20 and num_anom[0] < 45:
        sendEmail("smartfarmingesw@gmail.com","Anomaly detected","Hi there! An anomaly was detected from the data with probability " + str(num_anom[0]) + ", there might be something you ight want to check out" + string)
    if num_anom[0] > 45 and num_anom[0] < 65:
        sendEmail("smartfarmingesw@gmail.com","Anomaly detected","Hi there! An anomaly was detected from the data with probability " + str(num_anom[0]) + ", it would be wise to check your farm once" + string)
    if num_anom[0] > 65 and num_anom[0] < 85:
        sendEmail("smartfarmingesw@gmail.com","Anomaly detected","Hi there! An anomaly was detected from the data with probability " + str(num_anom[0]) + ", something is up in the farm, please check it" + string)
    if num_anom[0] > 85 and num_anom[0] < 105:
        sendEmail("smartfarmingesw@gmail.com","Anomaly detected","Hi there! An anomaly was detected from the data with probability " + str(num_anom[0]) + ", visit your farm to make sure nothing is wrong" + string)

    if num_anom[1] > 10 and num_anom[1] < 25:
        sendEmail("smartfarmingesw@gmail.com","Anomaly detected","Hi there! An anomaly was detected from the data with probability " + str(num_anom[1]) + ", it may not be something worrying" + string)
    if num_anom[1] > 20 and num_anom[1] < 45:
        sendEmail("smartfarmingesw@gmail.com","Anomaly detected","Hi there! An anomaly was detected from the data with probability " + str(num_anom[1]) + ", there might be something you ight want to check out" + string)
    if num_anom[1] > 45 and num_anom[1] < 65:
        sendEmail("smartfarmingesw@gmail.com","Anomaly detected","Hi there! An anomaly was detected from the data with probability " + str(num_anom[1]) + ", it would be wise to check your farm once" + string)
    if num_anom[1] > 65 and num_anom[1] < 85:
        sendEmail("smartfarmingesw@gmail.com","Anomaly detected","Hi there! An anomaly was detected from the data with probability " + str(num_anom[1]) + ", something is up in the farm, please check it" + string)
    if num_anom[1] > 85 and num_anom[1] < 105:
        sendEmail("smartfarmingesw@gmail.com","Anomaly detected","Hi there! An anomaly was detected from the data with probability " + str(num_anom[1]) + ", visit your farm to make sure nothing is wrong" + string)

    if num_anom[2] > 10 and num_anom[2] < 25:
        sendEmail("smartfarmingesw@gmail.com","Anomaly detected","Hi there! An anomaly was detected from the data with probability " + str(num_anom[2]) + ", it may not be something worrying" + string)
    if num_anom[2] > 20 and num_anom[2] < 45:
        sendEmail("smartfarmingesw@gmail.com","Anomaly detected","Hi there! An anomaly was detected from the data with probability " + str(num_anom[2]) + ", there might be something you ight want to check out" + string)
    if num_anom[2] > 45 and num_anom[2] < 65:
        sendEmail("smartfarmingesw@gmail.com","Anomaly detected","Hi there! An anomaly was detected from the data with probability " + str(num_anom[2]) + ", it would be wise to check your farm once" + string)
    if num_anom[2] > 65 and num_anom[2] < 85:
        sendEmail("smartfarmingesw@gmail.com","Anomaly detected","Hi there! An anomaly was detected from the data with probability " + str(num_anom[2]) + ", something is up in the farm, please check it" + string)
    if num_anom[2] > 85 and num_anom[2] < 105:
        sendEmail("smartfarmingesw@gmail.com","Anomaly detected","Hi there! An anomaly was detected from the data with probability " + str(num_anom[2]) + ", visit your farm to make sure nothing is wrong" + string)
    
    if num_anom[3] > 10 and num_anom[3] < 25:
        sendEmail("smartfarmingesw@gmail.com","Anomaly detected","Hi there! An anomaly was detected from the data with probability " + str(num_anom[3]) + ", it may not be something worrying" + string)
    if num_anom[3] > 20 and num_anom[3] < 45:
        sendEmail("smartfarmingesw@gmail.com","Anomaly detected","Hi there! An anomaly was detected from the data with probability " + str(num_anom[3]) + ", there might be something you ight want to check out" + string)
    if num_anom[3] > 45 and num_anom[3] < 65:
        sendEmail("smartfarmingesw@gmail.com","Anomaly detected","Hi there! An anomaly was detected from the data with probability " + str(num_anom[3]) + ", it would be wise to check your farm once" + string)
    if num_anom[3] > 65 and num_anom[3] < 85:
        sendEmail("smartfarmingesw@gmail.com","Anomaly detected","Hi there! An anomaly was detected from the data with probability " + str(num_anom[3]) + ", something is up in the farm, please check it" + string)
    if num_anom[3] > 85 and num_anom[3] < 105:
        sendEmail("smartfarmingesw@gmail.com","Anomaly detected","Hi there! An anomaly was detected from the data with probability " + str(num_anom[3]) + ", visit your farm to make sure nothing is wrong" + string)
    
    if num_anom[4] > 10 and num_anom[4] < 25:
        sendEmail("smartfarmingesw@gmail.com","Anomaly detected","Hi there! An anomaly was detected from the data with probability " + str(num_anom[4]) + ", it may not be something worrying" + string)
    if num_anom[4] > 20 and num_anom[4] < 45:
        sendEmail("smartfarmingesw@gmail.com","Anomaly detected","Hi there! An anomaly was detected from the data with probability " + str(num_anom[4]) + ", there might be something you ight want to check out" + string)
    if num_anom[4] > 45 and num_anom[4] < 65:
        sendEmail("smartfarmingesw@gmail.com","Anomaly detected","Hi there! An anomaly was detected from the data with probability " + str(num_anom[4]) + ", it would be wise to check your farm once" + string)
    if num_anom[4] > 65 and num_anom[4] < 85:
        sendEmail("smartfarmingesw@gmail.com","Anomaly detected","Hi there! An anomaly was detected from the data with probability " + str(num_anom[4]) + ", something is up in the farm, please check it" + string)
    if num_anom[4] > 85 and num_anom[4] < 105:
        sendEmail("smartfarmingesw@gmail.com","Anomaly detected","Hi there! An anomaly was detected from the data with probability " + str(num_anom[4]) + ", visit your farm to make sure nothing is wrong" + string)
    
    if num_anom[5] > 10 and num_anom[5] < 25:
        sendEmail("smartfarmingesw@gmail.com","Anomaly detected","Hi there! An anomaly was detected from the data with probability " + str(num_anom[5]) + ", it may not be something worrying" + string)
    if num_anom[5] > 20 and num_anom[5] < 45:
        sendEmail("smartfarmingesw@gmail.com","Anomaly detected","Hi there! An anomaly was detected from the data with probability " + str(num_anom[5]) + ", there might be something you ight want to check out" + string)
    if num_anom[5] > 45 and num_anom[5] < 65:
        sendEmail("smartfarmingesw@gmail.com","Anomaly detected","Hi there! An anomaly was detected from the data with probability " + str(num_anom[5]) + ", it would be wise to check your farm once" + string)
    if num_anom[5] > 65 and num_anom[5] < 85:
        sendEmail("smartfarmingesw@gmail.com","Anomaly detected","Hi there! An anomaly was detected from the data with probability " + str(num_anom[5]) + ", something is up in the farm, please check it" + string)
    if num_anom[5] > 85 and num_anom[5] < 105:
        sendEmail("smartfarmingesw@gmail.com","Anomaly detected","Hi there! An anomaly was detected from the data with probability " + str(num_anom[5]) + ", visit your farm to make sure nothing is wrong" + string)
    

    sumanom = sum(num_anom)
    if sumanom > 0:
        time.sleep(10)

if __name__ == '__main__':
    while(True):
        try: 
            test()
        finally:
            # print("Timeout, going to try again")
            time.sleep(10)