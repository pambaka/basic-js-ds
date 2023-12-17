const { NotImplementedError } = require('../extensions/index.js');

const { ListNode } = require('../extensions/list-node.js');

/**
 * Implement the Queue with a given interface via linked list (use ListNode extension above).
 *
 * @example
 * const queue = new Queue();
 *
 * queue.enqueue(1); // adds the element to the queue
 * queue.enqueue(3); // adds the element to the queue
 * queue.dequeue(); // returns the top element from queue and deletes it, returns 1
 * queue.getUnderlyingList() // returns { value: 3, next: null }
 */
class Queue {
  listNode;

  getUnderlyingList() {
    return this.listNode;
  }

  enqueue(value) {
    if (!this.listNode) {
      this.listNode = new ListNode(value);
    } else {
      let currentNode = this.listNode;
      while (currentNode.next !== null) {
        currentNode = currentNode.next;
      }
      currentNode.next = new ListNode(value);
    }
    
    return this.listNode;
  }

  dequeue() {
    const dequeuedNodeValue = this.listNode.value;
    this.listNode.value = this.listNode.next.value;
    this.listNode.next = this.listNode.next.next;
    return dequeuedNodeValue;
  }
}

module.exports = {
  Queue
};
