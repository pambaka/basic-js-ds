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
    if (!this.node) throw new Error;
    
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
      return null;
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

    let currentNode;
    let previousNode;
    let isLeft;
    
    if (data === this.node.data) {
      delete this.node;
    } else {
      if ( data < this.node.data) {
        if (this.node.left === null) {
          return null;
        } else {
          previousNode = this.node;
          currentNode = this.node.left;
          isLeft = true;
        }
      }
      if (data > this.node.data) {
        if (this.node.right === null) {
          return null;
        } else {
          previousNode = this.node;
          currentNode = this.node.right;
          isLeft = false;
        }
      }
      
      searchAndRemoveNode(currentNode);
    }

    function searchAndRemoveNode (node) {
      if (data === node.data) {
        if (isLeft) {
          if (node.left !== null && node.right === null) {
            node.data = node.left.data;
            previousNode.left = node.left;
          }
          if (node.left === null && node.right !== null) {
            node.data = node.right.data;
            previousNode.left = node.right;
          }
          if (node.left !== null && node.right !== null) {
            // deleted node has both child nodes -> max left / min right
            // previousNode.left = node.left;
            // node.data = node.left.data;
          }
        } else {
          if (node.left !== null && node.right === null) {
            node.data = node.left.data;
            previousNode.right = node.left;
          }
          if (node.left === null && node.right !== null) {
            node.data = node.right.data;
            previousNode.right = node.right;
          }
        }
      } else {
        if (data < node.data) {
          if (node.left === null) {
            return null;
          } else {
            previousNode = node;
            node = node.left
            isLeft = true;
          }
        } 
        if (data > node.data) {
          if (node.right === null) {
            return null;
          } else {
            previousNode = node;
            node = node.right
            isLeft = false;
          }
        }
        searchAndRemoveNode(node);
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