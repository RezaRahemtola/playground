import smartpy as sp

class StoreString(sp.Contract):
    def __init__(self):
        self.init(storedValue = "", updates = sp.nat(0))
        self.init_type(sp.TRecord(
            storedValue = sp.TString,
            updates     = sp.TNat,
        ))

    @sp.entry_point
    def concat(self, params):
        self.data.storedValue += params.value
        self.data.updates += 1

if "templates" not in __name__:
    @sp.add_test(name = "StoreString")
    def test():
        c1 = StoreString()
        scenario = sp.test_scenario()
        scenario.h1("Store String")
        scenario += c1
        c1.concat(value = "Hello ")
        scenario.verify(c1.data.storedValue == "Hello ")
        c1.concat(value = "world!")
        scenario.verify(c1.data.storedValue == "Hello world!")

    sp.add_compilation_target("storeString", StoreString())
