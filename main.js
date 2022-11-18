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

        console.log(array.slice(start, mid))

        node.left = this.buildTree(array.slice(start, mid))
        node.right = this.buildTree(array.slice(mid + 1))

        return node
    }

    insert(value, pointer = this.root) {

        if (pointer === null) {
            return new Node(value);
        }
        if (pointer.value === value) {
            return;
        } 

        if (pointer.value < value) {
            pointer.left = this.insert(value, pointer.left)
        } else {
            pointer.right = this.insert(value, pointer.right)
        }
        return pointer

    }
}

let tree = new Tree([1,2,3,4,5,6,7])

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



