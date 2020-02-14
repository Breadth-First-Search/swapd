function customLCS_subseq(s1, s2) {
  let dp = [] /* .fill(Array(s2.length+1).fill(0)) */

  for (let row = 0; row <= s1.length; row++) {
    dp.push([])
    for (let col = 0; col <= s2.length; col++) {
      dp[row].push([])
    }
  }

  let lcs = []
  for (let row = 1; row < dp.length; row++) {
    for (let col = 1; col < dp[row].length; col++) {
      if (s1[row - 1].toLowerCase() === s2[col - 1].toLowerCase()) {
        const prev = dp[row - 1][col - 1]
        // if(prev.length > 0) {
        //   if(Math.abs(prev[prev.length - 1] - (col - 1)) > 2){
        //     dp[row][col] = [...prev]
        //     continue
        //   }
        // }
        dp[row][col] = [...prev, col - 1] // String: dp[row - 1][col - 1] + s1[row - 1].toLowerCase()
        // lcs = lcs.length < dp[row][col].length ? dp[row][col] : lcs
      } else {
        dp[row][col] =
          dp[row - 1][col].length > dp[row][col - 1].length
            ? [...dp[row - 1][col]]
            : [...dp[row][col - 1]] //String:  dp[row - 1][col].length > dp[row][col - 1].length ? dp[row - 1][col] : dp[row][col - 1]
      }
    }
  }
  // console.log(dp[s1.length][s2.length])
  return dp[s1.length][s2.length]
}

function customLCS_substr(s1, s2) {
  let dp = []

  for (let row = 0; row <= s1.length; row++) {
    dp.push([])
    for (let col = 0; col <= s2.length; col++) {
      dp[row].push(0)
    }
  }

  let max = 0

  for (let row = 1; row < dp.length; row++) {
    for (let col = 1; col < dp[row].length; col++) {
      if (s1[row - 1] === s2[col - 1]) {
        dp[row][col] = dp[row - 1][col - 1] + 1
        max = Math.max(max, dp[row][col])
      }
    }
  }

  return max
}

function customLCS_substr_weighted(s1, s2) {
  let dp = []

  for (let row = 0; row <= s1.length; row++) {
    dp.push([])
    for (let col = 0; col <= s2.length; col++) {
      dp[row].push('')
    }
  }

  let max = ''

  for (let row = 1; row < dp.length; row++) {
    for (let col = 1; col < dp[row].length; col++) {
      if (s1[row - 1].toLowerCase() === s2[col - 1].toLowerCase()) {
        dp[row][col] = dp[row - 1][col - 1] + s1[row - 1]
        max = max.length < dp[row][col].length ? dp[row][col] : max
      }
    }
  }

  console.log(max)

  return max
}

function KMPmatch(s, p) {
  const failure = pattern => {
    const ret = Array(pattern.length).fill(0)

    let k = 0,
      j = 1

    while (j < pattern.length) {
      if (pattern[j] === pattern[k]) {
        ret[j] = k + 1
        k++
        j++
      } else if (k > 0) {
        k = ret[k - 1]
      } else j++
    }
    return ret
  }

  if (p.length === 0) return 0
  let j = 0,
    k = 0
  const fail = failure(p)
  // console.log(fail)
  while (j < s.length) {
    if (s[j] === p[k]) {
      if (k === p.length - 1) return j - p.length + 1
      j++
      k++
    } else if (k > 0) k = fail[k - 1]
    else j++
  }

  return -1
}

function aggregateSearchScore(serviceName, searchString) {
  let lcs = customLCS_substr_weighted(serviceName, searchString)

  console.log(serviceName, searchString)

  return lcs.length - KMPmatch(searchString, lcs) // - KMPmatch(serviceName, lcs)
}

// algo = longest common substring weighted by searchString.length - KMPmatch(searchString,LCS(searchString, name))

console.log(aggregateSearchScore('foo piano happy', 'piano'))
console.log(aggregateSearchScore('pills and automobiles', 'piano'))
console.log(aggregateSearchScore('basketball lessons', 'piano lessons'))
console.log(aggregateSearchScore('basketball lessons', 'lessons of basketball'))
console.log(aggregateSearchScore('piano tutoring', 'piano'))
console.log(aggregateSearchScore('piano lessons', 'piano'))
console.log(aggregateSearchScore('piano offering', 'piano'))
console.log(aggregateSearchScore('basketball with lessons', 'piano lessons'))
console.log(aggregateSearchScore('piano (loser) lessons', 'piano'))
console.log(aggregateSearchScore('intermediate piano lessons', 'piano'))
console.log(aggregateSearchScore('piano lessons', 'piano'))
