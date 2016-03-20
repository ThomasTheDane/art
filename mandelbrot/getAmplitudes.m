clear;clc;
data = importdata('data/brainDamage.mp3');
fs = data.fs;
data = (data.data(:,1)+1) / 2;
numData = size(data,1);
duration = numData / fs;

% take duration in seconds and multiply by 30 to get number of frames 
numFrames = duration * 30;
frequency = (numData/numFrames);

final = data(1:frequency:numData);

fid = fopen('brainDamage.txt','wt');

g=sprintf('%f\n', final);

fprintf(fid, g);
fclose(fid);

