package domain

import (
	"testing"
	"github.com/stretchr/testify/require"
)

func TestRobotString(t *testing.T) {
	testCases := []struct {
		x, y, direction, xMin, yMin, xMax, yMax uint
		name, commands string
		expectedRobot Robot
	} {
		{
			name: "Simple forward",
			x: 0,
			y: 0,
			direction: 0,
			xMin: 0,
			yMin: 0,
			xMax: 100,
			yMax: 100,
			commands: "F",
			expectedRobot: Robot{ "robot", 0, 1, 0},
		},
		{
			name: "Simple backward",
			x: 0,
			y: 1,
			direction: 0,
			xMin: 0,
			yMin: 0,
			xMax: 100,
			yMax: 100,
			commands: "B",
			expectedRobot: Robot{ "robot", 0, 0, 0},
		},
		{
			name: "Fail backward",
			x: 0,
			y: 0,
			direction: 0,
			xMin: 0,
			yMin: 0,
			xMax: 100,
			yMax: 100,
			commands: "B",
			expectedRobot: Robot{ "robot", 0, 0, 0},
		},
		{
			name: "Simple left",
			x: 0,
			y: 0,
			direction: 0,
			xMin: 0,
			yMin: 0,
			xMax: 100,
			yMax: 100,
			commands: "L",
			expectedRobot: Robot{ "robot", 0, 0, 3},
		},
		{
			name: "Simple right",
			x: 0,
			y: 0,
			direction: 0,
			xMin: 0,
			yMin: 0,
			xMax: 100,
			yMax: 100,
			commands: "R",
			expectedRobot: Robot{ "robot", 0, 0, 1},
		},
		{
			name: "Simple right + forward",
			x: 0,
			y: 0,
			direction: 0,
			xMin: 0,
			yMin: 0,
			xMax: 100,
			yMax: 100,
			commands: "RF",
			expectedRobot: Robot{ "robot", 1, 0, 1},
		},
		{
			name: "Simple left + backward",
			x: 50,
			y: 0,
			direction: 0,
			xMin: 0,
			yMin: 0,
			xMax: 100,
			yMax: 100,
			commands: "LB",
			expectedRobot: Robot{ "robot", 3, 0, 51},
		},
	}
	for _, c := range testCases {
		t.Run(c.name, func(t *testing.T) {
			r := Robot { Name: "robot", X: c.x, Y: c.y, Direction: c.direction }
			//s := Surface { Xmin: c.xMin, Ymin: c.yMin, Xmax: c.xMax, Ymax: c.yMax }
			require.Equal(t, c.expectedRobot, r)
		})
	}
}
