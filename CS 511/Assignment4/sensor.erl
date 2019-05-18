% Name: Donald Tang, Wenkang Su
% Pledge: I pledge my honor I have abided by the Stevens Honor System.

-module(sensor).
-compile(export_all).

%From is the PID, ID is the respective ID
sensor(From, Id) ->
	%Each measurement will be randomly generated from 0-11.
	Measurement = rand:uniform(11),
	%If measurement is 11, crash with the report "anomalous_reading"
	if Measurement == 11 ->
		From!{Id, "anomalous_reading"},
		exit(anomalous_reading);
	%else, send measurement
	true ->
		From!{Id, Measurement}
	end,
	%sleep for random time between measurements
	Sleep_time = rand:uniform(10000),
	timer:sleep(Sleep_time),
	%loop back to report more measurements
	sensor(From, Id).