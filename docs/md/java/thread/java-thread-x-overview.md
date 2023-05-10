---
title: ♥Java并发知识体系详解♥

---

# Java线程编程

### 线程基础

#### 进程和线程

- 进程是操作系统分配资源的基本单位，包括内存、文件句柄、网络连接等。
- 线程是进程执行的基本单位，一个进程可包含多个线程，它们共享进程的资源。

#### 线程的创建和启动

- 实现Runnable接口并覆写run()方法，或继承Thread类并覆写run()方法。
- 创建Thread对象并传入Runnable实例或Thread子类实例。
- 调用start()方法启动线程。

```java
public class MyThread extends Thread {
@Override
public void run() {
// 线程执行代码
}
}

public class MyTask implements Runnable {
@Override
public void run() {
// 线程执行代码
}
}

public class Test {
public static void main(String[] args) {
MyThread t1 = new MyThread();
t1.start();

MyTask task = new MyTask();
Thread t2 = new Thread(task);
t2.start();
}
}
```

#### 线程安全

- 多线程访问共享资源时需要进行同步控制，避免出现数据不一致或并发问题。
- synchronized关键字可用于控制方法或代码块的同步。
- volatile关键字可用于保证变量的可见性和禁止指令重排。

#### 线程的状态

- NEW：线程创建但未运行。
- RUNNABLE：线程正在执行或可运行。
- BLOCKED：线程等待获取锁。
- WAITING：线程等待其他线程的特定操作。
- TIMED_WAITING：线程等待其他线程的特定操作，等待一段时间后会自动恢复。
- TERMINATED：线程已终止。

#### 线程优先级

- 使用1~10表示线程的优先级，数值越大优先级越高，默认为5。
- 线程优先级高并不能保证每次都先执行，只是大概率先执行。

#### 守护线程

- 守护线程是一种特殊的线程，它会在所有非守护线程结束后自动终止。
- setDaemon()方法可将线程设置为守护线程。

### 线程同步

#### synchronized关键字

- synchronized关键字可用于方法或代码块的同步。
- synchronized同步方法：锁住整个方法，等价于synchronized(this)。
- synchronized同步代码块：锁住指定对象。

```java
class Counter {
private int count = 0;

public synchronized void increment() {
count++;
}
}

class Demo {
public void test() {
Counter counter = new Counter();
synchronized (counter) {
counter.increment();
}
}
}
```

#### Lock接口

- Lock接口提供比synchronized更灵活的锁机制，可实现公平锁、读写锁等功能。
- 可以手动加锁和解锁，避免死锁问题。

```java
class Counter {
private int count = 0;
private Lock lock = new ReentrantLock();

public void increment() {
lock.lock();
try {
count++;
} finally {
lock.unlock();
}
}
}
```

#### volatile关键字

- volatile关键字可用于保证变量的可见性和禁止指令重排。
- 常用于标记共享变量，避免多线程并发问题。

```java
class Counter {
private volatile int count = 0;

public void increment() {
count++;
}
}
```

#### 原子操作类

- 原子操作类可用于实现线程安全的自增、自减等操作，避免加锁带来的性能问题。

```java
class Counter {
private AtomicInteger count = new AtomicInteger(0);

public void increment() {
count.incrementAndGet();
}
}
```

### 线程通信

#### wait()和notify()/notifyAll()

- wait()方法可使线程进入等待状态，放弃锁的占用权，直到被其他线程唤醒。
- notify()/notifyAll()方法可唤醒等待该对象的线程并使其重新获取锁。

```java
class Producer implements Runnable {
private List> list;

public Producer(List> list) {
this.list = list;
}

@Override
public void run() {
synchronized (list) {
while (list.size() >= 1) {
try {
list.wait();
} catch (InterruptedException e) {
e.printStackTrace();
}
}
list.add("Product");
System.out.println("Produced 1 product, total " + list.size() + " products");
list.notifyAll();
}
}
}

class Consumer implements Runnable {
private List> list;

public Consumer(List> list) {
this.list = list;
}

@Override
public void run() {
synchronized (list) {
while (list.size() <= 0) {
try {
list.wait();
} catch (InterruptedException e) {
e.printStackTrace();
}
}
list.remove(0);
System.out.println("Consumed 1 product, total " + list.size() + " products");
list.notifyAll();
}
}
}

public class Test {
public static void main(String[] args) {
List> list = new ArrayList<>();
Producer producer = new Producer(list);
Consumer consumer = new Consumer(list);
new Thread(producer).start();
new Thread(consumer).start();
}
}
```

#### Condition接口

- Condition接口提供了更灵活的线程等待机制。
- 可以创建多个Condition对象配合单个锁使用。

```java
class BoundedBuffer {
private final String[] buffer;
private int head;
private int tail;
private int count;

private final Lock lock = new ReentrantLock();
private final Condition notFull = lock.newCondition();
private final Condition notEmpty = lock.newCondition();

public BoundedBuffer(int capacity) {
this.buffer = new String[capacity];
this.head = 0;
this.tail = 0;
this.count = 0;
}

public void put(String item) throws InterruptedException {
lock.lock();
try {
while (count == buffer.length) {
notFull.await();
}
buffer[tail] = item;
tail = (tail + 1) % buffer.length;
count++;
notEmpty.signal();
} finally {
lock.unlock();
}
}

public String take() throws InterruptedException {
lock.lock();
try {
while (count == 0) {
notEmpty.await();
}
String item = buffer[head];
head = (head + 1) % buffer.length;
count--;
notFull.signal();
return item;
} finally {
lock.unlock();
}
}
}
```

### 多线程编程风格

#### 线程池

- 线程池是管理和重用线程的机制，避免因线程创建和销毁带来的性能开销。
- 线程池采用工厂模式创建线程，将线程的创建和销毁封装在一起，提供一定数量的线程等待任务。
- 可以使用Executors工具类创建常用类型的线程池。

```java
public class Test {
public static void main(String[] args) {
ExecutorService executor = Executors.newFixedThreadPool(10);

for (int i = 0; i < 100; i++) {
executor.submit(new Task());
}

executor.shutdown();
}
}
```

#### Future接口

- Future接口和实现类FutureTask提供了在多线程环境下执行异步任务并获取结果的机制。

```java
public class Task implements Callable> {
@Override
public Integer call() throws Exception {
// 执行耗时操作
return 0;
}
}

public class Test {
public static void main(String[] args) throws ExecutionException, InterruptedException {
ExecutorService executor = Executors.newSingleThreadExecutor();

Task task = new Task();
Future> future = executor.submit(task);

Integer result = future.get();
System.out.println("Result: " + result);

executor.shutdown();
}
}
```

#### CompletionService接口

- CompletionService接口提供了线程池处理任务结果的机制，可以异步处理多个任务并按完成顺序获取结果。

```java
public class Task implements Callable> {
private int id;

public Task(int id) {
this.id = id;
}

@Override
public Integer call() throws Exception {
// 执行耗时操作
return id;
}
}

public class Test {
public static void main(String[] args) throws InterruptedException, ExecutionException {
ExecutorService executor = Executors.newFixedThreadPool(10);
CompletionService> completionService = new ExecutorCompletionService<>(executor);

for (int i = 0; i < 10; i++) {
completionService.submit(new Task(i));
}

for (int i = 0; i < 10; i++) {
Future> future = completionService.take();
int result = future.get();
System.out.println("Task " + result + " completed.");
}

executor.shutdown();
}
}
```

