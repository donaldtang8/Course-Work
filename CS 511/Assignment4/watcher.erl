% Name: Donald Tang, Wenkang Su
% Pledge: I pledge my honor I have abided by the Stevens Honor System.

-module(watcher).
-compile(export_all).

start() ->
    {ok, [ N ]} = io:fread("enter number of sensors> ", "~d") ,
    if N =< 1 ->
          io:fwrite("setup: range must be at least 2~n", []) ;
    true -> 
		Num_watchers = 1 + (N div 10) ,
		setup_loop(N, Num_watchers, 0) 
 end. 

% setup_loop creates new watchers and passes in an empty sensor list
% if there are less than 10 sensors, we only need to make one watcher and pass in an initial empty sensor list
setup_loop(Num_sensors, Num_watchers, Id) when Num_sensors < 10 ->
	spawn(watcher, setup_watcher, [Num_sensors, Id, []]);
% if there are more than 10 sensors, then we need to use recursion to make Num_watcher watchers, incrementing count (id) by 10 each iteration
setup_loop(Num_sensors, Num_watchers, Id) ->
	spawn(watcher, setup_watcher, [10, Id, []]),
	setup_loop(Num_sensors-10, Num_watchers-1, Id+10).

% setup_watcher creates new sensors for each watcher, creates a tuple element for each sensor, and then adds it to the sensor list for each watcher
setup_watcher(Num_sensors, Id, ListOfSensors) ->
	% when there are no more sensors, start reading measurements
	if Num_sensors == 0 ->
		io:fwrite("Watcher Starting:~w~n", [ListOfSensors]),
		read_measurements(self(), ListOfSensors);
	% else, keep creating new sensors and appending new tuple to sensor list
	true ->
		{Pid, _} = spawn_monitor(sensor, sensor, [self(), Id]),
		setup_watcher(Num_sensors-1, Id+1, lists:append([{Id, Pid}],ListOfSensors))
	end.

read_measurements(CurrPid, ListOfSensors) ->
	receive
		% if a sensor crashes, we replace the crashed sensor with a newly created sensor and update the sensor list
		{Id, "anomalous_reading"} ->
			{Id, Pid} = lists:keyfind(Id, 1, ListOfSensors),
			Delete = lists:delete({Id, Pid}, ListOfSensors),
			%lists:delete(lists:keyfind(Id, 1, ListOfSensors)),
			{NewPid, _} = spawn_monitor(sensor, sensor, [self(), Id]),
			NewListOfSensors = lists:append([{Id, NewPid}], Delete),
			io:fwrite("Sensor ~w died, reason: anomalous_reading. Replacing sensor ~w with replacement sensor: ~w~n", [Id, Id, NewListOfSensors]);
		% if a measurement is received, we print
		{Id, Measurement} ->
			io:fwrite("Sensor ~w reported measurement ~w~n", [Id, Measurement]),
			NewListOfSensors = ListOfSensors
	end,
	read_measurements(CurrPid, NewListOfSensors).

