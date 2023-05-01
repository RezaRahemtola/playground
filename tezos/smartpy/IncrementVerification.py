import smartpy as sp

class IncrementVerification(sp.Contract):
    def __init__(self, admin : sp.TAddress):
        self.init(storedValue = 0, lastCaller = admin, owner = admin)

    @sp.entry_point
    def add(self, params):
        sp.verify(params.value > 0, "Value should be positive")
        sp.verify(params.value < 10, "Value should be less than 10")
        sp.verify(self.data.lastCaller != sp.sender, "You can't call this entrypoint twice in a row")
        self.data.storedValue += params.value
        self.data.lastCaller = sp.sender

    @sp.entry_point
    def sub(self, params):
        sp.verify(params.value > 0, "Value should be positive")
        sp.verify(sp.sender == self.data.owner, "Only the contract owner can call this entrypoint")
        sp.verify(params.value > self.data.storedValue, "Value shouldn't be superior to storage content")
        self.data.storedValue -= params.value

    @sp.entry_point
    def reset(self):
        sp.verify(sp.sender == self.data.owner, "Only the contract owner can call this entrypoint")
        self.data.storedValue = 0
    

if "templates" not in __name__:
    @sp.add_test(name = "IncrementVerification")
    def test():
        alice = sp.test_account("alice")
        bob = sp.test_account("bob")
        owner = sp.test_account("owner")
        c1 = IncrementVerification(admin = owner.address)
        scenario = sp.test_scenario()
        scenario.h1("Increment Verification")
        scenario += c1
        c1.add(value = 5).run(sender = alice)
        c1.add(value = 5).run(sender = alice, valid = False)
        c1.add(value = 3).run(sender = bob)
        scenario.verify(c1.data.storedValue == 8)
        c1.add(value = -2).run(sender = alice, valid = False)
        c1.add(value = 11).run(sender = alice, valid = False)
        c1.reset().run(sender = alice, valid = False)
        c1.reset().run(sender = owner)
        scenario.verify(c1.data.storedValue == 0)

    sp.add_compilation_target("incrementVerification", IncrementVerification(sp.address("tz1_ADMIN")))
