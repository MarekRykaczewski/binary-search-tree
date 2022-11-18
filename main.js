class Node {
    constructor(data) {
        this.data = data
        this.left = null
        this.right = null
    }
}

class Tree {
    constructor(array) {
        this.array = array
        this.root = this.buildTree(array)
    }

    buildTree(array) {
        let start = 0
        let end = array.length - 1
        let mid = Math.floor(array.length / 2)

        if (start > end) return null

        let node = new Node(array[mid])

        // console.log(array.slice(start, mid))

        node.left = this.buildTree(array.slice(start, mid))
        node.right = this.buildTree(array.slice(mid + 1))

        return node
    }

    insert(value, pointer = this.root) {

        if (pointer === null) {
            return new Node(value);
        }
        if (pointer.data === value) {
            return;
        } 

        if (pointer.data < value) {
            pointer.right = this.insert(value, pointer.right)
        } else {
            pointer.left = this.insert(value, pointer.left)
        }
        return pointer

    }
}

let tree = new Tree([1,2,3,5,6,7,8])

// console.log(tree.buildTree([1,2,3,4,5,6,7]))

const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }

const util = require("util")

// prettyPrint(tree.buildTree([1,2,3,4,5,6,7]))
// tree.insert(8)
// console.log(util.inspect(tree.insert(4), false, null, true /* enable colors */))
tree.insert(4)

prettyPrint(tree.root)


