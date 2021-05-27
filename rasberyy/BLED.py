import sys
import RPi.GPIO as GPIO
import board
import digitalio
import time
BLED = 5
GPIO.setup(BLED, GPIO.OUT)
GPIO.output(BLED, GPIO.HIGH)
time.sleep(5)
GPIO.output(BLED, GPIO.LOW)
time.sleep(5)