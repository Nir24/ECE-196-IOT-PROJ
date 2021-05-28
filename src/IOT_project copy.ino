#include "IRremote.h"
#include "IR.h"

IRrecv irrecv(RECEIVER); // create instance of 'irrecv'
decode_results results;  // create instance of 'decode_results'

void setup()
{
  pinMode(2, OUTPUT);
  pinMode(3, OUTPUT);
  pinMode(4, OUTPUT);
  digitalWrite(2, LOW);
  digitalWrite(3, LOW);
  digitalWrite(4, LOW);
  Serial.begin(9600);
  Serial.println("IR Receiver Button Decode");
  irrecv.enableIRIn();
}

void loop()
{
  if (irrecv.decode(&results)) // have we received an IR signal?
  {
    if (results.value == 0xFF30CF)
    {
      digitalWrite(2, LOW);
      digitalWrite(4, LOW);
      digitalWrite(3, HIGH);
      Serial.println("1");
    }
    if (results.value == 0xFF6897)
    {
      digitalWrite(3, LOW);
      digitalWrite(4, LOW);
      digitalWrite(2, HIGH);
      Serial.println("0");
    }
    if (results.value == 0xFF18E7)
    {
      digitalWrite(3, LOW);
      digitalWrite(2, LOW);
      digitalWrite(4, HIGH);
      Serial.println("2");
    }
    irrecv.resume(); // receive the next value
  }
  //    switch(results.value)
  //  {
  //  case 0xFFA25D: Serial.println("POWER"); break;
  //  case 0xFFE21D: Serial.println("FUNC/STOP"); break;
  //  case 0xFF629D: Serial.println("VOL+"); break;
  //  case 0xFF22DD: Serial.println("FAST BACK");    break;
  //  case 0xFF02FD: Serial.println("PAUSE");    break;
  //  case 0xFFC23D: Serial.println("FAST FORWARD");   break;
  //  case 0xFFE01F: Serial.println("DOWN");    break;
  //  case 0xFFA857: Serial.println("VOL-");    break;
  //  case 0xFF906F: Serial.println("UP");    break;
  //  case 0xFF9867: Serial.println("EQ");    break;
  //  case 0xFFB04F: Serial.println("ST/REPT");    break;
  //  case 0xFF6897: Serial.println("0");    break;
  //  case 0xFF30CF: Serial.println("1");    break;
  //  case 0xFF18E7: Serial.println("2");    break;
  //  case 0xFF7A85: Serial.println("3");    break;
  //  case 0xFF10EF: Serial.println("4");    break;
  //  case 0xFF38C7: Serial.println("5");    break;
  //  case 0xFF5AA5: Serial.println("6");    break;
  //  case 0xFF42BD: Serial.println("7");    break;
  //  case 0xFF4AB5: Serial.println("8");    break;
  //  case 0xFF52AD: Serial.println("9");    break;
  //  case 0xFFFFFFFF: Serial.println(" REPEAT");break;
  //  default: break;
  //  }
}
