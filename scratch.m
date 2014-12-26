clear all;
% myImg = imread('allGreen.png');
% myImg = imread('allWhite.png');
myImg = resizeImage(imread('test2.jpg'), 600, 600);
imgDimensions = size(myImg);
% image(myImg);

myImgColorContent = measureColorAmounts(myImg);

%% Load in a bunch of images and evaluate their color 
dirList = dir('sourceImages');

%cut off the . and .. and .DS
dirList = dirList(4:end);

sourceColorInfo = zeros(length(dirList), 3);
% sourceColorInfo = dirList.name;

% For each, read it into a matrix and evaluate color content of whole image
sourceImages = [];
for i = 1:length(dirList)
	tempImg = imread(strcat('sourceImages/', dirList(i).name));
	sourceColorInfo(i, :) = measureColorAmounts(grabMiddleSquare(tempImg));
end

% Chop the image up and find nearest neighbor
chopWidth = 10;
chopHeight = 10;
imagePieces = zeros(floor(imgDimensions(1)/chopHeight), floor(imgDimensions(2)/chopWidth)); %Will hold indexes indicating which image is appropriate for that square
for i = 1: imgDimensions(1) / chopHeight
	disp(i)
	for j = 1: imgDimensions(2) / chopWidth
		imgPiece = myImg(1+(i-1)*chopHeight:(i*chopHeight), 1+(j-1)*chopHeight:(j*chopHeight),:);
		colorContent = measureColorAmounts(imgPiece);
		imagePieces(i,j) = findClosetsMatch(colorContent,sourceColorInfo);
	end
end
imagePieces

% Stich the proper images together to get 
% TODO: optimize by cacheing any image that is loaded 
imagePiecesSize = 100;
finalImage = [];
for i = 1: imgDimensions(1) / chopHeight
	finalImageRow = [];
	for j = 1: imgDimensions(2) / chopWidth
		% Construct an entire row and then add it on the final image 
		toPlaceImage = imread(strcat('sourceImages/',dirList(imagePieces(i,j)).name));
		% toPlaceImage = imread(strcat('sourceImages/',dirList(16).name));
		toPlaceImage = resizeImage(grabMiddleSquare(toPlaceImage), imagePiecesSize, imagePiecesSize);
		finalImageRow = [finalImageRow toPlaceImage];
	end
	finalImage = [finalImage; finalImageRow];
end
image(finalImage);










