import rpyc
import threading
import time
import cv2
import numpy


class DetectionTask: 
      
    def __init__(self):
        self._detect = False

    def pause(self):
        self.cap.release()
        self._detect = False
    
    def start(self):
        self.cap = cv2.VideoCapture(0, cv2.CAP_DSHOW) 
        self._detect = True
    
    def status(self):
        return self._detect
    
    def terminate(self):
        if cap:
            self.cap.release()
        
    def run(self): 
        while True: 
            if(self._detect):
                time.sleep(0.5)
                ret, frame = self.cap.read()
                print(frame.shape)
            else:
                time.sleep(1)
                print("Not Detecting")
        


class DetectionService(rpyc.Service):

    def __init__(self):
        self.c = DetectionTask() 
        self.t = threading.Thread(target=self.c.run)

    def on_connect(self, conn):
        self.t.start()

    def on_disconnect(self, conn):
        self.c.terminate()
        self.t.join()

    def exposed_detection_start(self):
        if(not self.c.status()):
            self.c.start()
    
    def exposed_detection_status(self):
        return self.c.status()

    def exposed_detection_end(self):
        if(self.c.status()):
            self.c.pause()

if __name__ == '__main__':
    t = rpyc.OneShotServer(DetectionService, port=18861)
    t.start()
    