class Node {
  constructor(value){
    this.left = null;
    this.right = null;
    this.value = value;
  }
}

class BinarySearchTree {
  constructor(){
    this.root = null;
  }
  insert(value){
    //Code here
    /*
      If value is less than root, go left
      If left is null, set this.left to the input value

      If value is greater than root, go right
      If right is null, set this.left to the input value
      If right is not null:
        - compare values
          - if greater, go right
          - if lower, go left

      If === then the value exists so we don't do anything
    */
    currNode = this.root;
    while (currNode) {
      if (currNode.value > value) {
        if (currNode.right === null) {
          currNode.right = new Node(value);
          break;
        } else {
          currNode = this.currNode.right;
        }
      } else if (currNode.value < value) {
        currNode = this.currNode.left
      } else {
        break
      }
    }


  }
  lookup(value){
    //Code here
  }
  // remove
}

const tree = new BinarySearchTree();
tree.insert(9)
tree.insert(4)
tree.insert(6)
tree.insert(20)
tree.insert(170)
tree.insert(15)
tree.insert(1)
JSON.stringify(traverse(tree.root))

//     9
//  4     20
//1  6  15  170

function traverse(node) {
  const tree = { value: node.value };
  tree.left = node.left === null ? null : traverse(node.left);
  tree.right = node.right === null ? null : traverse(node.right);
  return tree;
}
