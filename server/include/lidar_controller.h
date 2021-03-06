// Author: Mihai Oltean, https://mihaioltean.github.io, mihai.oltean@gmail.com
// More details: https://jenny5.org, https://jenny5-robot.github.io/
// Source code: github.com/jenny5-robot
// License: MIT
// ---------------------------------------------------------------------------

#ifndef lidar_controller_H
#define lidar_controller_H

#include "scufy_lib.h"

#define LIDAR_NUM_STEPS 200

#define CANNOT_CONNECT_TO_JENNY5_LIDAR_STR "CANNOT_CONNECT_TO_JENNY5_LIDAR\n" 
#define CANNOT_CONNECT_TO_JENNY5_LIDAR_ERROR 1

#define LIDAR_does_not_respond_STR "LIDAR does not respond! Game over!\n"
#define LIDAR_does_not_respond_ERROR 2

#define Connected_to_LIDAR_STR "Connected to LIDAR\n"

struct t_lidar_controller {
	t_scufy_lib arduino_controller;
	int lidar_distances[LIDAR_NUM_STEPS];

	t_lidar_controller(void);
	void disconnect(void);
	bool is_connected(void);

	int connect(const char* port);
	bool setup(char* error_string);
	bool update_data(void);

	const char *error_to_string(int error);
};

extern t_lidar_controller LIDAR_controller;

#endif