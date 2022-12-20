with open("day20.in") as f:
    lines = list(f.readlines())


def solve(part):
    nums = [(i, int(x) * [1, 811589153][part - 1]) for (i, x) in enumerate(lines)]
    m = len(nums) - 1
    for _ in range([1, 10][part - 1]):
        for I in range(len(nums)):
            i = [x[0] for x in nums].index(I)
            n = nums[i]
            j = (n[1] + i) % m
            del nums[i]
            nums.insert(j, n)

    n0 = [x[1] for x in nums].index(0)

    print(sum(nums[(n0 + d) % len(nums)][1] for d in [1000, 2000, 3000]))


solve(1)
solve(2)
