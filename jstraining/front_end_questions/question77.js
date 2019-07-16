const rotateArray = function (array, k) {
    if (array && array.length() > 0) {

    }
};

function currying(fn, length) {
    length = length || fn.length;
    return function (...args) {
        return args.length >= length ?
            fn.apply(this, args) :
            currying(fn.bind(this, ...args), length - args.length);
    }
}

function findSumArray(nums, target) {
    let sum = [];
    if (nums.some((value, index) => {
            let indexOf = nums.indexOf(target - value);
            if (indexOf !== -1) {
                sum.splice();
                sum.push(index, indexOf);
                return true;
            }
        })) {
        return sum;
    }
}
/*
https协议由 http + ssl 协议构成，具体的链接过程可参考SSL或TLS握手的概述
https://github.com/lvwxx/blog/issues/3
中间人攻击过程如下：

服务器向客户端发送公钥。
攻击者截获公钥，保留在自己手上。
然后攻击者自己生成一个【伪造的】公钥，发给客户端。
客户端收到伪造的公钥后，生成加密hash值发给服务器。
攻击者获得加密hash值，用自己的私钥解密获得真秘钥。
同时生成假的加密hash值，发给服务器。
服务器用私钥解密获得假秘钥。
服务器用加秘钥加密传输信息
防范方法：

服务端在发送浏览器的公钥中加入CA证书，浏览器可以验证CA证书的有效性
 */

/**
 * 第 92 题：已知数据格式，实现一个函数 fn 找出链条中所有的父级 id
 */
const fn = (data, value) => {
    let res = []
    const dfs = (arr, temp = []) => {
        for (const node of arr) {
            if (node.children) {
                dfs(node.children, temp.concat(node.id))
            } else {
                if (node.id === value) {
                    res = temp
                }
                return
            }
        }
    }
    dfs(data)
    return res
}

/*
第 93 题：给定两个大小为 m 和 n 的有序数组 nums1 和 nums2。请找出这两个有序数组的中位数。要求算法的时间复杂度为 O(log(m+n))。
示例 1：

nums1 = [1, 3]
nums2 = [2]
复制代码
中位数是 2.0

示例 2：

nums1 = [1, 2]
nums2 = [3, 4]
复制代码
中位数是(2 + 3) / 2 = 2.5
 */
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
    let m = nums1.length
    let n = nums2.length
    let k1 = Math.floor((m + n + 1) / 2)
    let k2 = Math.floor((m + n + 2) / 2)

    return (findMedianSortedArraysCore(nums1, 0, nums2, 0, k1) + findMedianSortedArraysCore(nums1, 0, nums2, 0, k2)) / 2
};

/**
 *
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} i
 * @param {number} j
 * @param {number} k
 * @return {number}
 */
const findMedianSortedArraysCore = (nums1, i, nums2, j, k)  => {
    // 如果数组起始位置已经大于数组长度-1
    // 说明已经是个空数组
    // 直接从另外一个数组里取第k个数即可
    if (i > nums1.length - 1) {
        return nums2[j + k - 1]
    }
    if (j > nums2.length - 1) {
        return nums1[i + k - 1]
    }
    // 如果k为1
    // 就是取两个数组的起始值里的最小值
    if (k === 1) {
        return Math.min(nums1[i], nums2[j])
    }
    // 取k2为(k/2)或者数组1的长度或者数组2的长度的最小值
    // 这一步可以避免k2大于某个数组的长度（长度为从起始坐标到结尾）
    let k2 = Math.floor(k / 2)
    let length1 = nums1.length - i
    let length2 = nums2.length - j
    k2 = Math.min(k2, length1, length2)

    let value1 = nums1[i + k2 - 1]
    let value2 = nums2[j + k2 - 1]

    // 比较两个数组的起始坐标的值
    // 如果value1小于value2
    // 就舍弃nums1前i + k2部分
    // 否则舍弃nums2前j + k2部分
    if (value1 < value2) {
        return findMedianSortedArraysCore(nums1, i + k2, nums2, j, k - k2)
    } else {
        return findMedianSortedArraysCore(nums1, i, nums2, j + k2, k - k2)
    }
}

// 一个不考虑其他数据类型的公共方法，基本满足大部分场景

function deepCopy(target, cache = new Set()) {
    if (typeof target !== 'object' || cache.has(target)) {
        return target
    }
    if (Array.isArray(target)) {
        target.map(t => {
            cache.add(t)
            return t
        })
    } else {
        return [...Object.keys(target), ...Object.getOwnPropertySymbols(target)].reduce((res, key) => {
            cache.add(target[key])
            res[key] = deepCopy(target[key], cache)
            return res
        }, target.constructor !== Object ? Object.create(target.constructor.prototype) : {})
    }
}
// 主要问题是
//
// symbol作为key，不会被遍历到，所以stringify和parse是不行的
// 有环引用，stringify和parse也会报错
// 我们另外用getOwnPropertySymbols可以获取symbol key可以解决问题1，用集合记忆曾经遍历过的对象可以解决问题2。当然，还有很多数据类型要独立去拷贝。比如拷贝一个RegExp，lodash是最全的数据类型拷贝了，有空可以研究一下
//
// 另外，如果不考虑用symbol做key，还有两种黑科技深拷贝，可以解决环引用的问题，比stringify和parse优雅强一些
/*
function deepCopyByHistory(target) {
    const prev = history.state
    history.replaceState(target, document.title)
    const res = history.state
    history.replaceState(prev, document.title)
    return res
}

async function deepCopyByMessageChannel(target) {
    return new Promise(resolve => {
        const channel = new MessageChannel()
        channel.port2.onmessage = ev => resolve(ev.data)
        channel.port1.postMessage(target)
    }).then(data => data)
}
*/
// 无论哪种方法，它们都有一个共性：失去了继承关系，所以剩下的需要我们手动补上去了，
// 故有Object.create(target.constructor.prototype)的操作

//用 JavaScript 写一个函数，输入 int 型，返回整数逆序后的字符串。如：输入整型 1234，返回字符串“4321”。
// 要求必须使用递归函数调用，不能用全局变量，输入函数必须只有一个参数传入，必须返回字符串。
function fun(num){
    let num1 = num / 10;
    let num2 = num % 10;
    if(num1<1){
        return num;
    }else{
        num1 = Math.floor(num1)
        return `${num2}${fun(num1)}`
    }
}
var a = fun(12345)
console.log(a)
console.log(typeof a)

function getUrlValue(url){
    if(!url) return;
    let res = url.match(/(?<=elective=)(\d+(,\d+)*)/);
    return res ?res[0].split(',') : [];
}
