---
title: 增删改查(service)

---

# 增删改查
::: tip 提示
本章节主要讲解运用MPService封装的增删改查。案例以[springboot融合mybatis-plus](mp-base-overview.md)的搭建结构为基础，请按照教程操作
或者参考[源码](https://github.com/xianglong123/cas-mybatis-plus/tree/master/src/test/java/com/cas)@123
:::

## Save
> 这里就提供了3个方法参考 [官方文档](https://baomidou.com/pages/49cc81/#select)

---

```java
@SpringBootTest
public class InsertServiceTest {

    @Autowired
    private UserService userService;

    /**
     * 插入一条记录（选择字段，策略插入）
     */
    @Test
    public void save() {
        User user = new User();
        user.setAge(12);
        user.setId(7L);
        user.setName("tom");
        user.setEmail("123@qq.com");
        boolean flag = userService.save(user);
        System.out.println(flag);
    }

    /**
     * 插入（批量）
     */
    @Test
    public void saveBatch() {
        boolean flag = userService.saveBatch(getUsers(20));
        System.out.println(flag);
    }

    /**
     * 插入（批量）, 就是你有一堆集合，我分批次给你插入，集合庞大的时候分批次插入效率更高
     */
    @Test
    public void saveBatchWithNum() {
        boolean flag = userService.saveBatch(getUsers(30), 2);
        System.out.println(flag);
    }

    private List<User> getUsers(Integer index) {
        List<User> users = new ArrayList<>();
        for (int i = index; i <= index + 5; i ++) {
            users.add(new User((long) i, "tim", index, "tim" + index + "@123.com"));
        }
        return users;
    }

}
```

## SaveOrUpdate
> 有四个方法参考 [官方文档](https://baomidou.com/pages/49cc81/#select) *boolean saveOrUpdate(T entity, Wrapper<T> updateWrapper); 存在安全问题，已计划移除*

---

```java
@SpringBootTest
public class InsertAndUpdateServiceTest {

    @Autowired
    private UserService userService;

    /**
     * TableId 注解存在更新记录，否插入一条记录
     * ==>  Preparing: SELECT id,name,age,email FROM user WHERE id=?
     * ==> Parameters: 7(Long)
     * <==    Columns: id, name, age, email
     * <==        Row: 7, tom, 12, 123@qq.com
     * <==      Total: 1
     * Releasing transactional SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@2000261e]
     * Fetched SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@2000261e] from current transaction
     * ==>  Preparing: UPDATE user SET name=?, age=?, email=? WHERE id=?
     * ==> Parameters: tom(String), 12(Integer), 123@qq.com(String), 7(Long)
     * <==    Updates: 1
     */
    @Test
    public void saveOrUpdate() {
        User user = new User();
        user.setAge(12);
        user.setId(90L);
        user.setName("tom");
        user.setEmail("123@qq.com");
        boolean flag = userService.saveOrUpdate(user);
        System.out.println(flag);
    }

    /**
     * 根据updateWrapper尝试更新，否继续执行saveOrUpdate(T)方法
     * 已计划删除，不推荐使用
     */
    @Test
    public void saveOrUpdateByWrapper() {
        // 不推荐
    }

    /**
     * 批量修改插入
     */
    @Test
    public void saveOrUpdateBatch() {
        boolean flag = userService.saveOrUpdateBatch(getUsers(35));
        System.out.println(flag);
    }

    /**
     * 批量修改插入
     */
    @Test
    public void saveOrUpdateBatchByNum() {
        boolean flag = userService.saveOrUpdateBatch(getUsers(40), 2);
        System.out.println(flag);
    }

    private List<User> getUsers(Integer index) {
        List<User> users = new ArrayList<>();
        for (int i = index; i <= index + 5; i ++) {
            users.add(new User((long) i, "tim", index, "tim" + index + "@123.com"));
        }
        return users;
    }
}
```

## Remove
> 一共4个方法参考 [官方文档](https://baomidou.com/pages/49cc81/#select)


```java

@SpringBootTest
public class RemoveTest {

    @Autowired
    private UserService userService;

    /**
     * 根据 queryWrapper 设置的条件，删除记录
     */
    @Test
    public void remove() {
        // 创建一个 Wrapper 条件
        QueryWrapper<User> wrapper = Wrappers.query();
        // 设置删除条件，例如：id 等于6 的记录
        wrapper.eq("id", 6L);
        userService.remove(wrapper);
    }

    /**
     * 根据 ID 删除
     */
    @Test
    public void removeById() {
        userService.removeById(2L);
    }

    /**
     * 根据 columnMap 条件，删除记录
     */
    @Test
    public void removeByMap() {
        Map<String, Object> map = new HashMap<>();
        map.put("id", 4L);
        userService.removeByMap(map);
    }

    /**
     * 删除（根据ID 批量删除）
     */
    @Test
    public void removeByIds() {
        Map<String, Object> map = new HashMap<>();
        map.put("name", "Sandy");
        userService.removeByIds(Arrays.asList(5L, 7L));
    }
}

```

## Update
> 一共5个方法参考 [官方文档](https://baomidou.com/pages/49cc81/#select)

---

```java
@SpringBootTest
public class UpdateServiceTest {

    @Autowired
    private UserService userService;

    /**
     * 根据 UpdateWrapper 条件，更新记录 需要设置sqlset
     */
    @Test
    public void update() {
        UpdateWrapper<User> update = Wrappers.update();
        update.eq("id", 20L).set("age", 20);
        boolean flag = userService.update(update);
    }

    /**
     * 根据 whereWrapper 条件，更新记录
     */
    @Test
    public void updateByEntity() {
        UpdateWrapper<User> update = Wrappers.update();
        // 可以在这用.set
        update.eq("id", 20L).set("age", 20);

        // 也可以在这里传对象
        User user = new User();
        user.setName("xl");

        boolean flag = userService.update(user, update);
        System.out.println(flag);
    }

    /**
     * 根据 ID 选择修改
     */
    @Test
    public void updateById() {
        User user = new User();
        user.setId(20L);
        user.setName("xl");
        boolean flag = userService.updateById(user);
        System.out.println(flag);
    }

    /**
     * 根据ID 批量更新
     */
    @Test
    public void updateBatchById() {
        boolean flag = userService.updateBatchById(getUsers(20));
    }

    /**
     * 根据ID 批量更新
     */
    @Test
    public void updateBatchByIdWithNum() {
        boolean flag = userService.updateBatchById(getUsers(20), 2);
    }

    private List<User> getUsers(Integer index) {
        List<User> users = new ArrayList<>();
        for (int i = index; i <= index + 5; i ++) {
            users.add(new User((long) i, "tim", index, "tim" + index + "@123.com"));
        }
        return users;
    }
}
```

## Get
> 一共5个方法参考 [官方文档](https://baomidou.com/pages/49cc81/#select)

---

```java
@SpringBootTest
public class GetServiceTest {

    @Autowired
    private UserService userService;

    /**
     * 根据 ID 查询
     */
    @Test
    public void getById() {
        User user = userService.getById(10L);
        System.out.println(user);
    }

    /**
     * 根据 Wrapper，查询一条记录。结果集，如果是多个会抛出异常，随机取一条加上限制条件 wrapper.last("LIMIT 1")
     */
    @Test
    public void getOne() {
        QueryWrapper<User> query = Wrappers.query();
        query.gt("id", 20L).last("LIMIT 1");
        User user = userService.getOne(query);
        System.out.println(user);
    }

    /**
     * 根据 Wrapper，查询一条记录,可以选择多条结果是否抛异常
     */
    @Test
    public void getOneNoError() {
        QueryWrapper<User> query = Wrappers.query();
        query.gt("id", 20L);
        // true 抛 | false 不抛
        User user = userService.getOne(query, false);
        System.out.println(user);
    }

    /**
     * 根据 Wrapper，查询一条记录[官方介绍说只查询一条，其实底层sql会查询满足条件的所有数据，在通过代码选择第一条, 推荐自己加wrapper.last("LIMIT 1")]
     */
    @Test
    public void getMap() {
        QueryWrapper<User> query = Wrappers.query();
        query.gt("id", 20L).last("LIMIT 1");
        Map<String, Object> map = userService.getMap(query);
        System.out.println(map);
    }

    /**
     * 根据 Wrapper，查询一条记录
     * 这里只能查询表格的第一行数据，后面的Function是对这个数据的额外处理
     */
    @Test
    public void getObj() {
        QueryWrapper<User> query = Wrappers.query();
        query.gt("id", 20L).last("LIMIT 1");
        Object obj = userService.getObj(query, x -> (Long)x + 1);
        System.out.println(obj);
    }

    private List<User> getUsers(Integer index) {
        List<User> users = new ArrayList<>();
        for (int i = index; i <= index + 5; i ++) {
            users.add(new User((long) i, "tim", index, "tim" + index + "@123.com"));
        }
        return users;
    }

}
```

## List
> 一共10个方法参考 [官方文档](https://baomidou.com/pages/49cc81/#select)

---

```java
@SpringBootTest
public class ListServiceTest {

    @Autowired
    private UserService userService;

    /**
     * 查询所有
     */
    @Test
    public void list() {
        List<User> users = userService.list();
        users.forEach(System.out::println);
    }

    /**
     * 查询列表
     */
    @Test
    public void listByWrapper() {
        QueryWrapper<User> wrapper = Wrappers.query();
        wrapper.eq("id", 20L);
        List<User> users = userService.list(wrapper);
        users.forEach(System.out::println);
    }

    /**
     * 查询（根据ID 批量查询）
     */
    @Test
    public void listByIds() {
        List<User> users = userService.listByIds(Arrays.asList(1L, 2L));
        users.forEach(System.out::println);
    }

    /**
     * 查询（根据 columnMap 条件）
     */
    @Test
    public void listByMap() {
        Map<String, Object> map = new HashMap<>();
        map.put("id", 1L);
        List<User> users = userService.listByMap(map);
        users.forEach(System.out::println);
    }

    /**
     * 查询所有列表
     */
    @Test
    public void listMaps() {
        List<Map<String, Object>> maps = userService.listMaps();
        maps.forEach(System.out::println);
    }

    /**
     * 查询列表
     */
    @Test
    public void listMapsByWrapper() {
        QueryWrapper<User> wrapper = Wrappers.query();
        wrapper.eq("id", 20L);
        List<Map<String, Object>> maps = userService.listMaps(wrapper);
        maps.forEach(System.out::println);
    }

    /**
     * 查询全部记录, 只查第一行记录
     */
    @Test
    public void listObjs() {
        List<Long> ids = userService.listObjs();
        ids.forEach(System.out::println);
    }

    /**
     * 查询全部记录
     */
    @Test
    public void listObjsWithFunction() {
        List<Long> ids = userService.listObjs(x -> (Long)x + 1);
        ids.forEach(System.out::println);
    }

    /**
     * 根据 Wrapper 条件，查询全部记录
     */
    @Test
    public void listObjsByWrapper() {
        QueryWrapper<User> wrapper = Wrappers.query();
        wrapper.eq("id", 20L);
        List<Long> ids = userService.listObjs(wrapper);
        ids.forEach(System.out::println);
    }

    /**
     * 根据 Wrapper 条件，查询全部记录
     */
    @Test
    public void getById() {
        QueryWrapper<User> wrapper = Wrappers.query();
        wrapper.eq("id", 20L);
        List<Long> ids = userService.listObjs(wrapper, x -> (Long) x + 1);
        ids.forEach(System.out::println);
    }
}
```

## Page
> 一共4个方法参考 [官方文档](https://baomidou.com/pages/49cc81/#select)

---

```java
@SpringBootTest
public class PageServiceTest {

    @Autowired
    private UserService userService;

    /**
     * 无条件分页查询
     */
    @Test
    public void page() {
        Page<User> page = userService.page(Page.of(1, 2));
        page.getRecords().forEach(System.out::println);
    }

    /**
     * 条件分页查询
     */
    @Test
    public void pageByWrapper() {
        QueryWrapper<User> wrapper = Wrappers.query();
        wrapper.eq("id", 20L);
        Page<User> page = userService.page(Page.of(1, 2), wrapper);
        page.getRecords().forEach(System.out::println);
    }

    /**
     * 无条件分页查询
     */
    @Test
    public void pageMaps() {
        Page<Map<String, Object>> mapPage = userService.pageMaps(Page.of(1, 2));
        mapPage.getRecords().forEach(System.out::println);
    }

    /**
     * 条件分页查询
     */
    @Test
    public void pageMapsByWrapper() {
        QueryWrapper<User> wrapper = Wrappers.query();
        wrapper.eq("id", 20L);
        Page<Map<String, Object>> mapPage = userService.pageMaps(Page.of(1, 2), wrapper);
        mapPage.getRecords().forEach(System.out::println);
    }
}
```

## Count
> 一共2个方法参考 [官方文档](https://baomidou.com/pages/49cc81/#select)

---

```java
@SpringBootTest
public class CountServiceTest {

    @Autowired
    private UserService userService;

    /**
     * 查询总记录数
     */
    @Test
    public void count() {
        long count = userService.count();
        System.out.println(count);
    }

    /**
     * 条件分页查询
     */
    @Test
    public void countByWrapper() {
        QueryWrapper<User> wrapper = Wrappers.query();
        wrapper.eq("id", 20L);
        Long count = userService.count(wrapper);
        System.out.println(count);
    }
}
```

## [链式]query
> 一共2个方法参考 [官方文档](https://baomidou.com/pages/49cc81/#select)

---

```java
@SpringBootTest
public class QueryChainServiceTest {

    @Autowired
    private UserService userService;

    /**
     * 链式查询 普通
     */
    @Test
    public void query() {
        User user = userService.query().eq("id", 20L).one();
        System.out.println(user);
    }

    /**
     * 链式查询 lambda 式。注意：不支持 Kotlin
     */
    @Test
    public void lambdaQuery() {
        User one = userService.lambdaQuery().eq(User::getId, 20L).one();
        System.out.println(one);
    }
}

```

## [链式]update
> 一共2个方法参考 [官方文档](https://baomidou.com/pages/49cc81/#select)

---

```java
@SpringBootTest
public class UpdateChainServiceTest {

    @Autowired
    private UserService userService;

    /**
     * 链式更改 普通
     */
    @Test
    public void update() {
        boolean id = userService.update().eq("id", 21L).remove();
        System.out.println(id);
    }

    /**
     * 链式更改 lambda 式。注意：不支持 Kotlin
     */
    @Test
    public void lambdaUpdate() {
        boolean id = userService.lambdaUpdate().eq(User::getId, 22L).remove();
        System.out.println(id);
    }
}
```


## 参考
[官方文档](https://baomidou.com/pages/49cc81/#select)

[源码](https://github.com/xianglong123/cas-mybatis-plus)

## 感谢
> 您好，如果文档能帮助到您，希望可以满足作者的小小虚荣心，在源码的项目上点一个小小的star ♥️