import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
import time #controlling the time on the pi
import board
import adafruit_dht
import digitalio
import adafruit_character_lcd.character_lcd as characterlcd
#import threading

import RPi.GPIO as GPIO #pi pin input and output manipulation

cred = credentials.Certificate("./ece196-sp21-proj-firebase-adminsdk-qq8qt-85223288a4.json")
firebase_admin.initialize_app(cred,{'databaseURL' : 'https://ece196-sp21-proj-default-rtdb.firebaseio.com/'})

lcd_rs = digitalio.DigitalInOut(board.D26)
lcd_en = digitalio.DigitalInOut(board.D19)
lcd_d7 = digitalio.DigitalInOut(board.D27)
lcd_d6 = digitalio.DigitalInOut(board.D22)
lcd_d5 = digitalio.DigitalInOut(board.D24)
lcd_d4 = digitalio.DigitalInOut(board.D25)
lcd_columns = 16
lcd_rows = 2
lcd = characterlcd.Character_LCD_Mono(lcd_rs, lcd_en, lcd_d4, lcd_d5, lcd_d6, lcd_d7, lcd_columns, lcd_rows)
lcd.clear()


LedPin = 15
MusicPin1 = 21
MusicPin0 = 16
MusicPin2 = 20
TaskListPin = 23
RLED = 6
BLED = 5
Motion = 12

temp_ref = db.reference('temp')
Music_ref = db.reference('MUSIC')
Tasks_ref = db.reference('TODO')
BLED_ref = db.reference('BLED')
RLED_ref = db.reference('RLED')
SECURITY_ref = db.reference('SECURITY')
INTR_ref = db.reference('INTR')


dhtDevice = adafruit_dht.DHT11(board.D4)
GPIO.setup(MusicPin1, GPIO.IN)
GPIO.setup(MusicPin0, GPIO.IN)
GPIO.setup(MusicPin2, GPIO.IN)
GPIO.setup(Motion, GPIO.IN)
GPIO.setup(LedPin, GPIO.OUT)
GPIO.setup(TaskListPin, GPIO.OUT)
GPIO.setup(RLED, GPIO.OUT)
GPIO.setup(BLED, GPIO.OUT)
GPIO.output(RLED, GPIO.LOW )
GPIO.output(BLED, GPIO.LOW )
GPIO.output(TaskListPin, GPIO.HIGH)

lcdIndex = 0
tempcounter = 0
temptoggle = True
redToggle = 0
blueToggle = 0
message = Tasks_ref.child('TASK0').get()
lcd.message = Tasks_ref.child('TASK0').get()

lcdMessageList = ["chill","chill","chill"]
ledonoff = [0,0]
securitytoggle = [0]

def listenerT0(event):
   if lcdMessageList[0] != event.data:
      lcdMessageList[0] = event.data
def listenerT1(event):
   if lcdMessageList[1] != event.data:
      lcdMessageList[1] = event.data
def listenerT2(event):
   if lcdMessageList[2] != event.data:
      lcdMessageList[2] = event.data
def listenBLED(event):
   if event.data == 1:
      ledonoff[0] = 1
   else:
      ledonoff[0] = 0
def listenRLED(event):
   if event.data == 1:
      ledonoff[1] = 1
   else:
      ledonoff[1] = 0
def listenSecurity(event):
   if event.data == 1:
      securitytoggle[0] = 1
   else:
      securitytoggle[0] = 0
   



while(True):

   if lcdMessageList[lcdIndex] != message:
      lcd.clear()
      lcd.message = lcdMessageList[lcdIndex]
      message = lcdMessageList[lcdIndex]

   Tasks_ref.child('TASK0').listen(listenerT0)
   Tasks_ref.child('TASK1').listen(listenerT1)
   Tasks_ref.child('TASK2').listen(listenerT2)

   BLED_ref.listen(listenBLED)
   RLED_ref.listen(listenRLED)
   SECURITY_ref.listen(listenSecurity)

   if ledonoff[0] == 1:
      GPIO.output(BLED, GPIO.HIGH)
   else:
      GPIO.output(BLED, GPIO.LOW)  

   if ledonoff[1] == 1:
      GPIO.output(RLED, GPIO.HIGH)
   else:
      GPIO.output(RLED, GPIO.LOW)   
      
   if GPIO.input(Motion) and securitytoggle[0] == 1:
      INTR_ref.set(1)

   if not GPIO.input(TaskListPin):
      if lcdIndex < 2:
         lcdIndex = lcdIndex + 1
         lcd.clear()
         lcd.message = lcdMessageList[lcdIndex]
         message = lcdMessageList[lcdIndex]
      else:
         lcdIndex = 0
         lcd.clear()
         lcd.message = lcdMessageList[lcdIndex]
         message = lcdMessageList[lcdIndex]

   if GPIO.input(MusicPin1):
      Music_ref.set(1)

   if GPIO.input(MusicPin0):
      Music_ref.set(0)

   if GPIO.input(MusicPin2):
      Music_ref.set(2)

   if(temptoggle):
      temperature_c = dhtDevice.temperature
      humidity = dhtDevice.humidity
      temp_ref.set(temperature_c)
      print("Temp: {}   Humidity: {}% ".format(temperature_c, humidity))
      temptoggle = False
   

   GPIO.output(LedPin, GPIO.HIGH )
   time.sleep(2)
   GPIO.output(LedPin, GPIO.LOW )

   if tempcounter < 10:
      tempcounter = tempcounter + 1
   else:
      temptoggle = True
      tempcounter = 0 


