function res = grabMiddleSquare(imgMatrix)
	dimens = size(imgMatrix);
	if(dimens(1) > dimens(2))
		res = imgMatrix(floor((dimens(1) / 2) - (dimens(2) / 2)): floor((dimens(1) / 2) + (dimens(2) / 2)), :, :);
	elseif(dimens(2) > dimens(1))
		res = imgMatrix(:, floor((dimens(2) / 2) - (dimens(1) / 2)): floor((dimens(2) / 2) + (dimens(1) / 2)), :);
	else
		res = imgMatrix;
	end
end