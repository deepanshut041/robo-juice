import rpyc
import threading
import time


class DetectionTask: 
      
    def __init__(self): 
        self._detect = False
        
    def pause(self): 
        self._detect = False
    
    def start(self):
        self._detect = True
    
    def status(self):
        return self._detect
        
    def run(self): 
        while True: 
            time.sleep(1)
            if(self._detect):
                print("Detecting")
            else:
                print("Not Detecting")
        


class DetectionService(rpyc.Service):

    def __init__(self):
        self.c = DetectionTask() 
        self.t = threading.Thread(target=self.c.run)

    def on_connect(self, conn):
        self.t.start()
        print("Detection Service Connected")

    def on_disconnect(self, conn):
        self.t.join()
        print("Detection Service Ended")

    def exposed_detection_start(self):
        self.c.start()
    
    def exposed_detection_status(self):
        return self.c.status()

    def exposed_detection_end(self):
        self.c.pause()

if __name__ == '__main__':
    t = rpyc.ThreadedServer(DetectionService, port=18861)
    t.start()
    