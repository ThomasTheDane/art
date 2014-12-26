function res = findClosetsMatch(matcher, matchings)
	bestScore = similarityMeasure(matcher, matchings(1, :));
	bestMatch = 1;

	for i = 2:length(matchings)
		if similarityMeasure(matcher, matchings(i, :)) > bestScore
			bestScore = similarityMeasure(matcher, matchings(i, :));
			bestMatch = i;
		end
	end
	res = bestMatch;
end