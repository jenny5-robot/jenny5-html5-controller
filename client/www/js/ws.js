"use strict";

var arrayBuffer;
var websocket;

//--------------------------------------------------------------------
    const CONNECT_TO_ROBOT = 1;
    const DISCONNECT_FROM_ROBOT = 2;
    const PAUSE_ROBOT = 3;
    const NAVIGATE_COMMAND = 4;
    const ROTATE_PLATFORM_COMMAND = 5;
    const LEG_MOVE_COMMAND = 6;
    const LEFT_ARM_BODY_LEFT_RIGHT_COMMAND = 7;
    const LEFT_ARM_UP_DOWN_COMMAND = 8;
    const LEFT_ARM_ROTATE_COMMAND = 9;
    const LEFT_ARM_ELBOW_MOVE_COMMAND = 10;
    const LEFT_ARM_FOREARM_MOVE_COMMAND = 11;
    const LEFT_ARM_GRIPPER_MOVE_COMMAND = 12;
    const HEAD_ROTATE_COMMAND = 13;
    const FACE_TRACKING_COMMAND = 14;
    const FOLLOW_PERSON_COMMAND = 15;
    const DISABLE_POWER_COMMAND = 16;
	const CAPTURE_HEAD_CAMERA = 17;
	const CAPTURE_LEFT_ARM_CAMERA = 18;
	const ERROR = 19;
	
//--------------------------------------------------------------------
function ws_connect()
{
	var button_connect = document.getElementById("connect_button");
	
	if (button_connect.innerText == "Connect"){
		var addr = "wss://" + window.location.host;
        websocket = new WebSocket(addr, "data");
		websocket.onopen = ws_on_open;
		websocket.onerror = ws_on_error;
		websocket.onmessage = ws_on_message_received;
		websocket.onclose = ws_on_close;
		websocket.binaryType = "arraybuffer";
	}
	else{
		websocket.close(1000, "normal shutdown");
	}
}
//--------------------------------------------------------------------
function ws_on_open() 
{
	set_disable_state(false);
	document.getElementById("connect_button").innerText = "Disconnect";
	
	set_all_up();
	document.getElementById("pause_robot_button").style.fontWeight = "bold";
}
//--------------------------------------------------------------------
function ws_on_error() 
{
	alert("websocket error");
}
//--------------------------------------------------------------------
function ws_on_close()
{
	document.getElementById("connect_button").innerText = "Connect";
	set_all_up();
	set_disable_state(true);
}
//--------------------------------------------------------------------
function ws_on_message_received_parsed(e)
{
	alert(arrayBuffer);
}
//--------------------------------------------------------------------
function ws_on_message_received(evt) 
{
	var fileReader = new FileReader();
	fileReader.onload = function() {arrayBuffer = this.result;};
	fileReader.addEventListener("loadend", ws_on_message_received_parsed);
	fileReader.readAsText(evt.data);

    console.log(evt.data);
}
//--------------------------------------------------------------------
function send_message_to_server()
{
	websocket.send("Hello Jenny 5!");
}
//--------------------------------------------------------------------
function send_command_to_robot(bx, by)
{
	var command_to_robot = new Uint8Array(2);
	command_to_robot[0] = bx;
	command_to_robot[1] = by;//String.fromCharCode(bx, by);
	websocket.send(command_to_robot);
}
//--------------------------------------------------------------------
function send_pause_robot()
{
	send_command_to_robot(1 << 7, PAUSE_ROBOT);
	set_all_up();
	document.getElementById("pause_robot_button").style.fontWeight = "bold";
}
//--------------------------------------------------------------------
function send_start_platform_navigate()
{
	send_command_to_robot(1 << 7, NAVIGATE_COMMAND);
	set_all_up();
	document.getElementById("navigate_platform_button").style.fontWeight = "bold";
}
//--------------------------------------------------------------------
function send_leg_move()
{
	send_command_to_robot(1 << 7, LEG_MOVE_COMMAND);
	set_all_up();
	document.getElementById("leg_button").style.fontWeight = "bold";
}
//--------------------------------------------------------------------
function send_rotate_platform()
{
	send_command_to_robot(1 << 7, ROTATE_PLATFORM_COMMAND);
	set_all_up();
	document.getElementById("rotate_platform_button").style.fontWeight = "bold";
}
//--------------------------------------------------------------------
function send_capture_head_camera()
{
	send_command_to_robot(1 << 7, CAPTURE_HEAD_CAMERA);
}
//--------------------------------------------------------------------
function send_capture_left_arm_camera()
{
	send_command_to_robot(1 << 7, CAPTURE_LEFT_ARM_CAMERA);	
}
//--------------------------------------------------------------------
function send_body_motor_move()
{
	send_command_to_robot(1 << 7, LEFT_ARM_BODY_LEFT_RIGHT_COMMAND);
	set_all_up();
	document.getElementById("body_button").style.fontWeight = "bold";	
}
//--------------------------------------------------------------------
function send_shoulder_motor_move()
{
	send_command_to_robot(1 << 7, LEFT_ARM_UP_DOWN_COMMAND);
	set_all_up();
	document.getElementById("shoulder_button").style.fontWeight = "bold";
}
//--------------------------------------------------------------------
function send_rotate_shoulder_motor_move()
{
	send_command_to_robot(1 << 7, LEFT_ARM_ROTATE_COMMAND);
	set_all_up();
	document.getElementById("rotate_shoulder_button").style.fontWeight = "bold";
}
//--------------------------------------------------------------------
function send_elbow_motor_move()
{
	send_command_to_robot(1 << 7, LEFT_ARM_ELBOW_MOVE_COMMAND);
	set_all_up();
	document.getElementById("elbow_button").style.fontWeight = "bold";
}
//--------------------------------------------------------------------
function send_forearm_motor_move()
{
	send_command_to_robot(1 << 7, LEFT_ARM_FOREARM_MOVE_COMMAND);
	set_all_up();
	document.getElementById("forearm_button").style.fontWeight = "bold";
}
//--------------------------------------------------------------------
function send_gripper_motor_move()
{
	send_command_to_robot(1 << 7, LEFT_ARM_GRIPPER_MOVE_COMMAND);
	set_all_up();
	document.getElementById("gripper_button").style.fontWeight = "bold";
}
//--------------------------------------------------------------------
function send_rotate_head()
{
	send_command_to_robot(1 << 7, HEAD_ROTATE_COMMAND);
	set_all_up();
	document.getElementById("rotate_head_button").style.fontWeight = "bold";
}
//--------------------------------------------------------------------
function send_track_head()
{
	send_command_to_robot(1 << 7, FACE_TRACKING_COMMAND);
	set_all_up();
	document.getElementById("track_head_button").style.fontWeight = "bold";
}
//--------------------------------------------------------------------
function send_follow_person()
{
	send_command_to_robot(1 << 7, FOLLOW_PERSON_COMMAND);
	set_all_up();
	document.getElementById("follow_person_button").style.fontWeight = "bold";
}
//--------------------------------------------------------------------