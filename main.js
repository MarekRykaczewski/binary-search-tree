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
        this.inorderData = [];
        this.preorderData = [];
        this.postorderData = [];
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

    deleteRec(value, root = this.root) {
    /* Base Case: If the tree is empty */
        if (root == null)
            return root;
   
        /* Otherwise, recur down the tree */
        if (value < root.data)
            root.left = this.deleteRec(value, root.left);
        else if (value > root.data)
            root.right = this.deleteRec(value, root.right);
   
        // if key is same as root's
        // key, then This is the
        // node to be deleted
        else {
            // node with only one child or no child
            if (root.left == null)
                return root.right;
            else if (root.right == null)
                return root.left;
   
            // node with two children: Get the inorder
            // successor (smallest in the right subtree)
            root.data = this.minValue(root.right);
   
            // Delete the inorder successor
            root.right = this.deleteRec(root.data, root.right);
        }
   
        return root;
    }

    minValue(root) {
        let min = root.data;
        while (root.left != null) {
          min = root.left.data;
          root = root.left;
        }
        return min;
    }

    find(value, root = this.root) {
        if (root === null || root.data === value)
            return root;

        if (root.data < value) {
            return root.right = this.find(value, root.right)
        } else {
            return root.left = this.find(value, root.left)
        }
    }

    levelOrder(root) {
        let queue = []
        let output = []

        if (root == null) return

        queue.push(root)

        while (queue.length > 0) {
            let current = queue.shift(root)
            output.push(current.data)

            if (current.left !== null) queue.push(current.left)
            if (current.left !== null) queue.push(current.right)
        }

        return output
    }

    inorder(root) {
        if (root == null) return

        if (root.left !== null) {
            this.inorder(root.left)
        }
        
        if (root.data !== undefined) {
            this.inorderData.push(root.data)
        }
        
        if (root.right !== null) {
            this.inorder(root.right)
        }

        return this.inorderData
    }

    preorder(root) {
        if (root == null) return

        if (root.data !== undefined) {
            this.preorderData.push(root.data)
        }

        if (root.left !== null) {
            this.preorder(root.left)
        }
        
        if (root.right !== null) {
            this.preorder(root.right)
        }

        return this.preorderData
    }

    postorder(root) {
        if (root == null) return

        if (root.left !== null) {
            this.postorder(root.left)
        }
        
        if (root.right !== null) {
            this.postorder(root.right)
        }

        if (root.data !== undefined) {
            this.postorderData.push(root.data)
        }

        return this.postorderData
    }

    height(root) {
        if (root == null) {
          return -1;
        } else {
          let left = this.height(root.left);
          let right = this.height(root.right);
    
          return Math.max(left, right) + 1;
        }
      }

      isBalanced(root) {
        if (root == null) return false;
    
        let leftHalf = root.left;
        let rightHalf = root.right;
    
        if (Math.abs(this.height(leftHalf) - this.height(rightHalf)) > 1) {
          return false;
        } else {
          return true;
        }
      }

      traverse(root, array) {
        if (array !== undefined) array.push(root.data);
        if (root.left !== null) {
          this.traverse(root.left, array);
        }
    
        if (root.right !== null) {
          this.traverse(root.right, array);
        }
        return array;
      }

      rebalance() {
        if (this.isBalanced(this.root)) return this.root;
    
        let rebalancedNewTreeArray = [];
        rebalancedNewTreeArray = this.traverse(this.root, rebalancedNewTreeArray);
    
        let balancedTree = new Tree(rebalancedNewTreeArray);
    
        return balancedTree.root;
      }
    
}

let tree = new Tree([1,2,3,5,6,7,8])

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
const { resourceLimits } = require("worker_threads")

// prettyPrint(tree.buildTree([1,2,3,4,5,6,7]))
// tree.insert(8)
// console.log(util.inspect(tree.insert(4), false, null, true /* enable colors */))
// tree.insert(4)

prettyPrint(tree.root)

// console.log(tree.find(2))
// tree.find(2)
// console.log(tree.levelOrder(tree.root))
// console.log(tree.inorder(tree.root))
// console.log(tree.preorder(tree.root))
// console.log(tree.postorder(tree.root))
console.log(tree.isBalanced(tree.root))