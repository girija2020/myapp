
#include "Adafruit_CCS811.h"
#include <Wire.h>
#include <BH1750.h>
#include "DHT.h"
#include "HTTPClient.h"
#include "time.h"
#include "ThingSpeak.h"
#include <WiFi.h>
#include <WebServer.h>
#define DHTTYPE DHT22
#define dht_pin 32

float temperature = 25;
float h1;
float t1;
uint16_t l1;
float humidity = 20;
float co2 = 400;
float voc = 0;
uint16_t light = 75;
/// float soi
#include "Adafruit_SGP40.h"
Adafruit_SGP40 sgp;
//

String cse_ip = "192.168.88.94";
String cse_port = "5555";
String ae = "Team-27";
HTTPClient http;

void createCI(String &val, String &cnt)
{
  //  /HTTPClient http;
  http.begin("https://esw-onem2m.iiit.ac.in/~/in-cse/in-name/Team-27/" + cnt);
  http.addHeader("X-M2M-Origin", "s6g!bh:4#kFbE");
  http.addHeader("Content-Type", "application/json;ty=4");
  int code = http.POST("{\"m2m:cin\": {\"cnf\":\"application/json\",\"con\": " + String(val) + "}}");
  Serial.println(code);
  if (code == -1)
  {
    Serial.println("UNABLE TO CONNECT TO THE SERVER");
  }
  http.end();
}

String node1 = "Lightsensor";
String node2 = "Soilsensor";
String node3 = "Tsensor";
String node4 = "Hsensor";
String node5 = "Vsensor";
String node6 = "Csensor";

//const char *ssid = "esw-m19@iiith";
//const char *password = "e5W-eMai@3!20hOct";
const char* ssid = "Galaxy M31B4C2";
const char* password = "rupasree";
const char *server = "api.thingspeak.com";
uint64_t writeChannelID = 1837496;
char *writeAPIKey = "5IWIF50NHZEER3IN";
WiFiClient client;
int const pinno = 35;

DHT dht(dht_pin, DHTTYPE);
BH1750 lightMeter(0x23);
/// BH1750 lightMeter;
// SDA = GPIO21;
// SCL = GPIO22
//(SDA,SCL)

Adafruit_CCS811 ccs;
const int AirValue = 3200;   // you need to replace this value with Value_1
const int WaterValue = 2160; // you need to replace this value with Value_2

void setup()
{
  Serial.begin(115200);
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  if (WiFi.status() != WL_CONNECTED)
  {
    Serial.print("Attempting to connect");
    while (WiFi.status() != WL_CONNECTED)
    {
      WiFi.begin(ssid, password);
      Serial.print("Attempting to connect");
      delay(5000);
    }
    Serial.println("\nConnected.");
  }

  //  Serial.begin(115200);
  //  delay(1000);
  //  WiFi.begin(ssid, password);
  //  while (WiFi.status() != WL_CONNECTED) {
  //    delay(1000);
  //    WiFi.begin(ssid, password);
  //    Serial.print("Connecting...");
  //  }
  //  Serial.println("WiFi connected.");

  //  if (! sgp.begin()){po
  //    Serial.println("Sensor not found :(");
  //    while (1);
  //  }
  //  Serial.print("Found SGP40 serial #");
  //  Serial.print(sgp.serialnumber[0], HEX);
  //  Serial.print(sgp.serialnumber[1], HEX);
  //  Serial.println(sgp.serialnumber[2], HEX);
  ThingSpeak.begin(client);
  dht.begin();

  Serial.println("CCS811 test");
  if (!ccs.begin())
  {
    Serial.println("Failed to start sensor! Please check your wiring.");
    while (1)
      ;
  }
  while (!ccs.available())
    ;
  Wire.begin();

  // starting light sensor
  Serial.println("Running...");
  lightMeter.begin(BH1750::CONTINUOUS_HIGH_RES_MODE, 0x23, &Wire);
  delay(1000);
  Serial.println(F("BH1750 Test begin"));
}

void loop()
{

  byte error, address;
  int nDevices;
  Serial.println("Scanning...");
  nDevices = 0;
  for (address = 1; address < 127; address++)
  {
    Wire.beginTransmission(address);
    error = Wire.endTransmission();
    if (error == 0)
    {
      Serial.print("I2C device found at address 0x");
      if (address < 16)
      {
        Serial.print("0");
      }
      Serial.println(address, HEX);
      nDevices++;
    }
    else if (error == 4)
    {
      Serial.print("Unknow error at address 0x");
      if (address < 16)
      {
        Serial.print("0");
      }
      Serial.println(address, HEX);
    }
  }
  if (nDevices == 0)
  {
    Serial.println("No I2C devices found\n");
  }
  else
  {
    Serial.println("done\n");
  }

  //  float t = sht31.readTemperature();
  //  Serial.print("Temp *C = "); Serial.print(t); Serial.print("\t\t");
  //  float h = sht31.readHumidity();
  //  Serial.print("Hum. % = "); Serial.println(h);
  //  uint16_t raw;
  //  raw = sgp.measureRaw();
  //  Serial.print("Measurement: ");
  //  Serial.println(raw);
  //  delay(1000);
  //  uint16_t vv;
  //  vv=sgp.measureVocIndex();
  //  Serial.print("vv: ");
  //  Serial.println(vv);
  //

  Serial.println("finding all values");
  l1 = lightMeter.readLightLevel();
  if (l1 >= 1 && l1 <= 65500)
  {
    light = l1;
  }
  Serial.print("Light: ");
  Serial.print(light);
  Serial.println(" lx");
  float soil;

  ////finding co2 and voc
  ////  /while (!ccs.available());
  if (ccs.available())
  {
    if (!ccs.readData())
    {
      Serial.print("CO2: ");
      float c1 = ccs.geteCO2();
      if (c1 >= 400 && c1 <= 8192)
        co2 = c1;
      Serial.print(ccs.geteCO2());
      Serial.print("ppm, TVOC: ");
      Serial.println(ccs.getTVOC());
      float v1 = ccs.getTVOC();
      if (v1 >= 0 && v1 <= 1187)
        voc = v1;
    }
    else
    {
      Serial.println("..");
      //      /
    }
  }

  t1 = dht.readTemperature();
  if ((!isnan(t1)) && t1 >= 0 && t1 <= 50)
    temperature = t1;
  h1 = dht.readHumidity();
  if (!isnan(h1) && h1 >= 0 && h1 <= 100)
    humidity = h1;
  Serial.print("Temperature ");
  Serial.println(temperature);
  Serial.print("Humidity ");
  Serial.println(humidity);
  //  Serial.print("Temperature ");
  //  Serial.println(t1);
  //  Serial.print("Humidity ");
  //  Serial.println(h1);
  //  uint16_t raw;
  //
  //  raw = sgp.measureRaw(temperature,humidity);
  //
  //  Serial.print("Measurement: ");
  //  Serial.println(raw);
  //  delay(1000);
  //  uint16_t vv;
  //  vv=sgp.measureVocIndex(temperature,humidity);
  //  Serial.print("vv: ");
  //  Serial.println(vv);

  // findind soil moiture
  int soilMoistureValue = analogRead(pinno); // put Sensor insert into soil
  int soilmoisturepercent = map(soilMoistureValue, AirValue, WaterValue, 0, 100);
  soil = soilmoisturepercent;
  if (soilmoisturepercent <= 0)
  {
    soil = 0;
    soilmoisturepercent = 0;
  }
  else if (soilmoisturepercent > 100)
  {
    soilmoisturepercent = 100;
    soil = soilmoisturepercent;
  }
  Serial.print("soil% ");
  Serial.print(soilmoisturepercent);
  Serial.println("%");
  Serial.print("soil ");
  Serial.println(soilMoistureValue);

  ThingSpeak.setField(1, co2);
  ThingSpeak.setField(2, voc);
  ThingSpeak.setField(3, temperature);
  ThingSpeak.setField(4, humidity);
  ThingSpeak.setField(5, light);
  ThingSpeak.setField(6, soil);
  int x = ThingSpeak.writeFields(writeChannelID, writeAPIKey);
  if (x == 200)
  {
    Serial.println("Channel update successful.");
  }
  else
  {
    Serial.println("Problem updating channel. HTTP error code " + String(x));
  }

  
  Serial.println("pushing light to om2m");
  String olight;
  olight = light;
  createCI(olight, node1);
  Serial.println("pushing co2 to om2m");
  String oco2;
  oco2 = co2;
  createCI(oco2, node6);
  Serial.println("pushing voc to om2m");
  String ovoc;
  ovoc = voc;
  createCI(ovoc, node5);
  //    /delay(1000);
  Serial.println("pushing temp to om2m");
  String otemp;
  otemp = temperature;
  createCI(otemp, node3);
  //    /delay(1000);
  Serial.println("pushing humidity to om2m");
  String ohum;
  ohum = humidity;
  createCI(ohum, node4);
  //    /delay(1000);
  Serial.println("pushing soilmoisturepercent to om2m");
  String osoil;
  osoil = soilmoisturepercent;
  createCI(osoil, node2);
  delay(30000);
}
