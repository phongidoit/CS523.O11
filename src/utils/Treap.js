// A Treap Node

let delayTime = 0;
function setDelayTime(x){
	delayTime = x;
}

let actions = [];

function getActions() {
	return actions;
}

function flustActions(){
	actions = [];
}

class TreapNode {
	constructor(key) {
		this.key = key;
		this.priority = Math.floor(Math.random() * 100);
		this.left = null;
		this.right = null;
	}
}

function newNode(key) {
	let temp = new TreapNode(key);
	// console.log(temp)
	return temp;
}

const delay = ms => new Promise(
	resolve => setTimeout(resolve, ms)
  );

  
class Treap {
    constructor() {
        this.root = null;
    }
	
	leftRotate(x) {
		// console.log("rotate left")
		actions.push("Priority Violation: Rotate Left")
		let y = x.right;
		let T2 = y.left;
	
		// Perform rotation
		y.left = x;
		x.right = T2;
	
		// Return new root

		return y;
	}

	rightRotate(y) {
		// console.log("rotate right")
		actions.push("Priority Violation: Rotate Right")
		let x = y.left;
		let T2 = x.right;
	
		// Perform rotation
		x.right = y;
		y.left = T2;
	
		// Return new root
		return x;
	}

    async insert(root, key, setChosenNode) {
		// console.log(this.root)
        // If root is null, create a new node and return it
        if (!root)
		{
			actions.push(`Create Node ${key}`)
            this.root = newNode(key);
			return this.root
		}

		setChosenNode(root.key);
		await delay(delayTime)
		// console.log("WAIT")

		if (key === root.key)
		{
			actions.push(`Already Exist`)
			this.root = root
			return this.root
		}
    
        // If key is smaller than root
		actions.push(`Compare Value to Current Node: ${key} vs ${root.key}`)
        if (key < root.key) {
            // Insert in the left subtree
			await this.insert(root.left, key, setChosenNode)
			.then((node)=> {root.left = node})
			// .then(setChosenNode(key));

            // Fix Heap property if it is violated
            if (root.left.priority > root.priority)
			{
				this.root = root;
				setChosenNode(key);
				await delay(delayTime);
                root =  this.rightRotate(root);
				this.root = root;
			}
        } else { // If key is greater
            // Insert in the right subtree
			await this.insert(root.right, key, setChosenNode)
			.then((node)=> {root.right = node})
			// .then(setChosenNode(key));

    
            // Fix Heap property if it is violated
            if (root.right.priority > root.priority)
			{
				this.root = root;
				setChosenNode(key);
				await delay(delayTime);
                root = await this.leftRotate(root);
				this.root = root;
			}
        }
		
		this.root = root
        return root;
    }

	deleteNode(root, key) {
		if (root === null)
			return root;
	
		if (key < root.key)
			root.left = this.deleteNode(root.left, key);
		else if (key > root.key)
			root.right = this.deleteNode(root.right, key);
	
		// IF KEY IS AT ROOT
		else if (root.left === null & root.right === null)
		{
			root = null;
		}
		// If left is NULL
		else if (root.left === null) {
			let temp = root.right;
			root = temp; // Make the right child the root
		}
		// If Right is NULL
		else if (root.right === null) {
			let temp = root.left;
			root = temp; // Make the left child the root
		}
		// If the key is at the root, and both left and right are not NULL
		else if (root.left.priority < root.right.priority) {
			root = this.leftRotate(root);
			root.left = this.deleteNode(root.left, key);
		} else {
			root = this.rightRotate(root);
			root.right = this.deleteNode(root.right, key);
		}
	

		this.root = root;
		return root;
	}

	async search(root, key, setChosenNode) {
		// console.log(setChosenNode);
		// Base Cases: root is null or key is present at root
		if (root === null || root.key === key)
			return root;

		setChosenNode(root.key);
		await delay(delayTime)
		// console.log(root.key);
		
		// Key is greater than root's key
		if (root.key < key)
			return this.search(root.right, key, setChosenNode);
	
		// Key is smaller than root's key
		return this.search(root.left, key, setChosenNode);
	}
}

export {TreapNode, Treap, setDelayTime}