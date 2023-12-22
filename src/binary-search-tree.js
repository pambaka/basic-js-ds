const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  node;

  root() {
    if (!this.node) {
      return null;
    }
    return this.node;
  }

  add(data) {
    if (!this.node) {
      this.node = new Node(data);
    } else {
      searchLastNodeToAdd(this.node);
    }

    function searchLastNodeToAdd (currentNode) {
      if (data < currentNode.data) {
        if (currentNode.left === null) {
          currentNode.left = new Node(data);
        }
        else {
          searchLastNodeToAdd(currentNode.left);
        }
      }
      if (data > currentNode.data) {
        if (currentNode.right === null) {
          currentNode.right = new Node(data);
        } else {
          searchLastNodeToAdd(currentNode.right);
        }
      }
    }
  }

  has(data) {
    if (!this.node) {
      return false;
    };
    
    return searchData(this.node);

    function searchData(currentNode) {
      if (data === currentNode.data) {
        return true;
      }

      if (data < currentNode.data) {
        if (currentNode.left === null) {
          return false;
        } else {
          return searchData(currentNode.left);
        }         
      }
      
      if (data > currentNode.data) {
        if (currentNode.right === null) {
          return false;
        } else {
          return searchData(currentNode.right);
        }
      } 
    }  
  }

  find(data) {
    if (!this.node) {
      return false;
    }
    
    return findNode (this.node);
    
    function findNode (node) {
      if (node.data === data) {
          return node;
      }
      if (data < node.data) {
        if (node.left === null) {
          return null;
        } else {
          return findNode (node.left);
        }
      }
      if (data > node.data) {
        if (node.right === null) {
          return null;
        } else {
          return findNode (node.right);
        }
      }
    }
  }
 
  remove(data) {
    if (!this.node) {
      return null;
    }
    
    this.node = searchAndRemoveNode(this.node);

    function searchAndRemoveNode (node) {
      if (data === node.data) {
        if (node.left === null && node.right === null) {
          return null;
        }

        if (node.left === null) {
          node = node.right;
          return node;
        }

        if (node.right === null) {
          node = node.left;
          return node;
        }

        let maxFromLeft = node.left;
        while (maxFromLeft.right) {
          maxFromLeft = maxFromLeft.right;
        }
        node.data = maxFromLeft.data;
        
        data = maxFromLeft.data;
        node.left = searchAndRemoveNode(node.left);
        
        return node;
      } else {
        if (data < node.data) {
          node.left = searchAndRemoveNode(node.left);
          
          return node;
        } 
        if (data > node.data) {
          node.right = searchAndRemoveNode(node.right);

          return node;
        }
      }
    }   
  }

  min() {
    if (!this.node) {
      return null;
    }

    let leftLeaf = this.node;

    while (leftLeaf.left !== null) {
      leftLeaf = leftLeaf.left;
    }

    return leftLeaf.data;
  }

  max() {
    if (!this.node) {
      return null;
    }

    let rightLeaf = this.node;

    while(rightLeaf.right !== null) {
      rightLeaf = rightLeaf.right;
    }

    return rightLeaf.data;
  }
}

module.exports = {
  BinarySearchTree
};