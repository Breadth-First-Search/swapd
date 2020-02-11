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
  return dp[s1.length][s2.length].length
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

console.log(LCS('piano', 'foo piano happy'))
console.log(LCS('piano', 'pills and automobiles'))
console.log(LCS('piano', 'piano tutoring'))
console.log(LCS('piano', 'piano lessons'))
console.log(LCS('piano', 'piano offering'))
console.log(LCS('piano lessons', 'basketball with lessons'))
console.log(LCS('piano lessons', 'piano (loser) lessons'))
console.log(LCS('piano lessons', 'piano (intermediate) lessons'))
console.log(LCS('peano lesson', 'piano lessons'))
