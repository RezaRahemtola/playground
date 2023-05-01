import smartpy as sp

owner = sp.address("tz1MSoqUm3TfneKDbkEtCHcKkCe33kC5XnnD")

class OwnerCollector(sp.Contract):
    def __init__(self, maxAmount):
        self.init(lastCollect = sp.none, maxCollect = maxAmount)

    @sp.entry_point
    def collect(self, requestedAmount):
        sp.verify(sp.sender == owner, "Only the owner can collect")
        sp.verify(requestedAmount <= sp.balance, "You can't collect more than the balance")
        sp.verify(requestedAmount <= self.data.maxCollect, "You can't collect more than the max amount")
        sp.if self.data.lastCollect != sp.none:
            lastTime = self.data.lastCollect.open_some()
            sp.verify(lastTime.add_minutes(2) < sp.now, "You have to wait at least 2 minutes to collect again")
        sp.send(owner, requestedAmount)
        self.data.lastCollect = sp.some(sp.now)

    @sp.entry_point
    def donate(self, newMaxCollect = sp.none):
        sp.verify(sp.amount >= sp.tez(100), "You should donate at least 100tez")
        sp.if newMaxCollect != sp.none:
            limit = newMaxCollect.open_some()
            sp.verify(limit >= sp.tez(1), "You can't set a limit lower than 1tez")
            self.data.maxCollect = limit
    

if "templates" not in __name__:
    @sp.add_test(name = "OwnerCollector")
    def test():
        alice = sp.test_account("alice")
        c1 = OwnerCollector(sp.tez(2))
        scenario = sp.test_scenario()
        scenario.h1("Owner Collector")
        scenario += c1
        c1.donate(sp.none).run(sender = alice, amount = sp.tez(5), valid = False)
        c1.donate(sp.none).run(sender = alice, amount = sp.tez(104))
        scenario.verify(c1.balance == sp.tez(104))
        c1.collect(sp.tez(2)).run(sender = alice, valid = False)
        c1.collect(sp.tez(3)).run(sender = owner, valid = False)
        c1.collect(sp.tez(2)).run(sender = owner)
        scenario.verify(c1.balance == sp.tez(102))
        c1.collect(sp.tez(1)).run(sender = owner, valid = False)

    sp.add_compilation_target("ownerCollector", OwnerCollector(sp.tez(2)))
