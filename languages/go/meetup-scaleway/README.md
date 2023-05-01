# mars-robot-kata



# Installing

## Preparing dependencies

```
$ make install
$ make build
$ make test
```

By the time being only care on making tests go Green!

## help! I'm getting errors ...

If there is a linking problem, maybe this can help

```
$ go get -u golang.org/x/sys
```

------


# Requirements v1

```
* For each robot, you are given a starting point (x,y) and the direction it is facing (N,E,W,S)

* The robot receives an array of commands

* Implement commands that move the robot (F, B)

* Implement commands that turn the robot (L, R) (both in 90°)

* Robots cannot move below (0,0) and beyond (xmax, ymax)
```


# Rules

* TDD. No Excuses!
* Change roles (driver, navigator) after each TDD cycle.


# Hints

* Before coding, think on the elements of your domain

* S.O.L.I.D
