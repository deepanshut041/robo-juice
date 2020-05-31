import rpyc

class PlcService(rpyc.Service):

    def __init__(self):
        pass
    
    def exposed_verify(self):
        return "Hello from plc service"

if __name__ == '__main__':
    t = rpyc.OneShotServer(PlcService, port=18862)
    t.start()