function res = measureColorAmounts(imageMatrix)
	imgDimensions = size(imageMatrix);
	numPixels = imgDimensions(1) * imgDimensions(2);


	red = sum(sum(imageMatrix(:, :, 1)));
	green = sum(sum(imageMatrix(:, :, 2)));
	blue = sum(sum(imageMatrix(:, :, 3)));

	sumColor = sum([red green blue]);
	if sumColor > 0
		red = red / sumColor;
		green = green / sumColor;
		blue = blue / sumColor;

		res = [red green blue];
	else
		res = [0 0 0];
	end
end