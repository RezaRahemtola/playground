import smartpy as sp

class Visitors(sp.Contract):
    def __init__(self):
        self.init(visitors = {})

    @sp.entry_point
    def register(self, name):
        sp.verify(sp.amount >= sp.tez(5), "You must pay 5tez for your first visit")
        self.data.visitors[sp.sender] = sp.record(visits = 0, name = name, lastVisit = sp.now)

    @sp.entry_point
    def visit(self):
        sp.verify(sp.amount >= sp.tez(3), "You must pay 3tez for your visit")
        sp.verify(self.data.visitors[sp.sender].lastVisit.add_days(10) < sp.now, "You must wait at least 10 days between visits")
        self.data.visitors[sp.sender].visits += 1
    

if "templates" not in __name__:
    @sp.add_test(name = "Visitors")
    def test():
        bob = sp.test_account("bob")
        c1 = Visitors()
        scenario = sp.test_scenario()
        scenario.h1("Visitors")
        scenario += c1
        c1.register("Bob Marley").run(sender = bob, valid = False)
        c1.register("Bob Marley").run(sender = bob, amount = sp.tez(5))
        c1.visit().run(sender = bob, valid = False)
        c1.visit().run(sender = bob, amount = sp.tez(3), valid = False)
        c1.visit().run(sender = bob, amount = sp.tez(3), now = sp.now.add_days(11))
        scenario.verify(c1.data.visitors[bob.address].visits == 1)

    sp.add_compilation_target("visitors", Visitors())
