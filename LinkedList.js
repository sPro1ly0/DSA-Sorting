// 5. Sorting a linked list using merge sort

/* Given a Linked List, sort the linked list using merge sort.
You will need your linked list class from previous lesson
to create the list and use all of its supplemental functions
 to solve this problem. */ 
class _Node {
    constructor(value, next) {
        this.value = value;
        this.next = next;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }

    insertFirst(item) {
        this.head = new _Node(item, this.head);
    }

    insertLast(item) {
        if (this.head === null) {
            this.insertFirst(item);
        }

        let newNode = this.head;
        while (newNode.next !== null) {
            newNode = newNode.next;
        }
        newNode.next = new _Node(item, null);
    }

    insertBefore(item, key) {
        if (this.head === null) {
            this.insertFirst(item);
        }

        let currentNode = this.head;
        let previousNode = this.head; 

        while (currentNode !== null && currentNode.value !== key ) {
            previousNode = currentNode;
            currentNode = currentNode.next;
        }

        if (currentNode === null) {
            console.log('Key not found');
            return;
        }

        let newNode = new _Node(item, currentNode);

        previousNode.next = newNode;
    }

    insertAfter(item, key) {
        if (this.head === null) {
            this.insertFirst(item);
        }

        let currentNode = this.head;
        let previousNode = this.head; 

        while (currentNode !== null && currentNode.value !== key ) {
            previousNode = currentNode;
            currentNode = currentNode.next;
        }

        if (currentNode === null) {
            console.log('Key not found');
            return;
        }

        let newNode = new _Node(item, currentNode.next);

        previousNode.next.next = newNode;
    }

    insertAt(item, position) {
        if (this.head === null) {
            this.insertFirst(item);
        }
        
        let currentPostion = 1;
        let currentNode = this.head;
        let previousNode = this.head; 

        while (currentPostion < position) {
            previousNode = currentNode;
            currentNode = currentNode.next;
            currentPostion++;
        }

        if (currentNode === null) {
            console.log('Key not found');
            return;
        }

        let newNode = new _Node(item, currentNode);
        if (position === 1) {
            this.insertFirst(item);
        } else {
            previousNode.next = newNode;
        }
    }

    remove(item) {
        if (!this.head) {
            return null;
        }

        if (this.head.value === item) {
            this.head = this.head.next;
            return;
        }

        let currentNode = this.head;
        let previousNode = this.head;

        while ((currentNode.value !== item) && (currentNode !== null)) {
            previousNode = currentNode;
            currentNode = currentNode.next;
        }
        if (currentNode === null) {
            return console.log('Item not found');
        }

        previousNode.next = currentNode.next;
    }

    find(item) {
        if (!this.head) {
            return null;
        }

        let currentNode = this.head;

        while (currentNode.value !== item) {
            if (currentNode.next === null) {
                return null;
            } else {
                currentNode = currentNode.next;
            }
        }
        
        return currentNode;
    }
}

function main() {
    const SLL = new LinkedList;

    SLL.insertFirst('Apollo');
    SLL.insertLast('Boomer');
    SLL.insertLast('Helo');
    SLL.insertLast('Husker');
    SLL.insertLast('Starbuck');

    SLL.insertLast('Tauhida');

    SLL.remove('Husker');

    SLL.insertBefore('Athena', 'Helo');

    SLL.insertAfter('Hotdog', 'Helo');

    SLL.insertAt('Kat', 3);

    SLL.remove('Tauhida');
    // console.log(SLL);
    return SLL;
}

function mergeSortLinkedList(list) {
    let currentNode = list.head;

    if (currentNode.next === null) {
        return list;
    }

    let length = 1;

    while (currentNode.next !== null) {
        length++;
        currentNode = currentNode.next;
    }

    const middle = Math.floor(length / 2);
    let left = splitLinkedList(list, 0, middle);
    let right = splitLinkedList(list, middle, length);
    return mergeLists(left, right);
}

function splitLinkedList(list, start, end) {
    let currentNode = list.head;

    if (currentNode === null) {
        return;
    }

    let splitList = new LinkedList();
    let i = 0;

    while (currentNode !== null) {
        if (i >= start && i < end) {
            splitList.insertLast(currentNode.value);
        }
        i++;
        currentNode = currentNode.next;
    }

    return splitList;
}

function mergeLists(leftList, rightList) {

    const mergeList = new LinkedList();
    let currentLeft = leftList.head;
    let currentRight = rightList.head;

    while (currentLeft && currentRight) {
        // if the value of the currentent node on the left list is lower, append it to the end of mergeList
        // and move currentLeft forward one node
        if (currentLeft.value <= currentRight.value) {
            mergeList.insertLast(currentLeft.value);
            currentLeft = currentLeft.next;
        } else {
            mergeList.insertLast(currentRight.value);
            currentRight = currentRight.next;
        }
    }
    // if one of the lists still has values while the other doesn't (in theory only one item), append that item
    while (currentLeft) {
        mergeList.insertLast(currentLeft.value);
        currentLeft = currentLeft.next;
    }
    while (currentRight) {
        mergeList.insertLast(currentRight.value);
        currentRight = currentRight.next;
    }
    return mergeList;
}

let linkedList = main();

console.log(mergeSortLinkedList(linkedList));