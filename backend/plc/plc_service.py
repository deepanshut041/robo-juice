import rpyc

class PlcService(rpyc.Service):

    def __init__(self):
        pass
    
    def exposed_verify(self):
        return "PLC Service is Working!"

if __name__ == '__main__':
    t = rpyc.OneShotServer(PlcService, port=18862)
    t.start()