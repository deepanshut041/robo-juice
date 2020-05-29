import zerorpc
import time

class PlcController():
    def __init__(self):
        Self.i = 5
    
    def makeDrink(self):
        print("Making Drink")
    
    def speakMsg(self, msg):
        print(msg)
    
    def getDrinkStatus(self):
        return self.i

server = zerorpc.Server(PlcController())
server.bind('tcp://0.0.0.0:4242')
server.run()