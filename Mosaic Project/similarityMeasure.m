function res = similarityMeasure(input1, input2)
	res = sum((input1 - input2) .^ 2);
end