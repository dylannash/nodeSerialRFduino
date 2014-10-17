int led_red = 2;
int led_green = 3;
int led_blue = 4;

int incomingByte = 0;
char iC;

void setup() {
  Serial.begin(9600);
  Serial.print("heyo");
  
  pinMode(led_red, OUTPUT);
  pinMode(led_green, OUTPUT);
  pinMode(led_blue, OUTPUT);  
}

void loop() {
  // put your main code here, to run repeatedly:
  
  if (Serial.available() > 0) {
    incomingByte = Serial.read();
    char iC = (char) incomingByte;
    if (iC == 'r') {
      digitalWrite(led_red, HIGH);
      digitalWrite(led_green, LOW);
      digitalWrite(led_blue, LOW);

    }
    if (iC == 'g') {
      digitalWrite(led_red, LOW);
      digitalWrite(led_green, HIGH);
      digitalWrite(led_blue, LOW);

    }
    if (iC == 'b') {
      digitalWrite(led_red, LOW);
      digitalWrite(led_green, LOW);
      digitalWrite(led_blue, HIGH);    
    }
    Serial.print(iC);
  }
}
