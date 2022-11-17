class Node {
    constructor(data, left, right) {
        this.data = data
        this.left = left
        this.right = right
    }
}

class Tree {
    constructor(array, root) {
        this.array = array
        this.root = root
    }

    buildTree(array) {
        let start = 0
        let end = array.length - 1
        let mid = Math.floor(array.length / 2)

        if (start > end) return null

        let node = new Node(array[mid])

        console.log(array.slice(start, mid))

        node.left = this.buildTree(array.slice(start, mid))
        node.right = this.buildTree(array.slice(mid + 1))

        return node
    }
}

let tree = new Tree

console.log(tree.buildTree([1,2,3,4,5,6,7]))

const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }

prettyPrint(tree.buildTree([1,2,3,4,5,6,7]))


