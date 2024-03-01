---
title: 属性加解密插件

---

# ♥属性加解密插件♥
::: tip 提示
之前工作的时候，遇到一个数据加密的需求，大致就是平台的一些敏感数据需要进行脱敏，因为项目已经运行很长一段时间，再加上系统很多，所以就开发了这个插件，相信工作上的小伙伴都或多或少的接触过
接下来我就将插件的能力和使用方法和大家分享下，[源码](https://github.com/xianglong123/mybatis-desensitization)自取，素质star。@123
:::

---
### 介绍
> 这个项目用到了mybatis提供的拦截器，初学的小伙伴可以先了解下mybatis拦截器的作用。这个需求我主要是想通过在入参和出参的节点加对应的拦截逻辑，恰好mybatis提供了对应的能力

```java
@Intercepts(
        {
                @Signature(type = ParameterHandler.class, method = "setParameters", args = {PreparedStatement.class}),
        })
public class EncryptInMybatisInterceptor implements Interceptor {
    @Override
    public Object intercept(Invocation invocation) throws Throwable {
        // 入参修改逻辑
    }
}
```

> 返参修改逻辑,正规叫结果集合处理
```java
@Intercepts(
        {
                @Signature(type = ResultSetHandler.class, method = "handleResultSets", args = {Statement.class}),
        })
@Import(cn.hutool.extra.spring.SpringUtil.class)
public class DecryptOutMybatisInterceptor implements Interceptor {
    @Override
    public Object intercept(Invocation invocation) throws Throwable {
        // 结果处理逻辑
    }
}
```

> 通过上面两个方法为基础，对逻辑todo加入自己业务的处理方法，[源码](https://github.com/xianglong123/mybatis-desensitization) 已经做了适当的处理，只需要开发继承对应的方法，实现加解密方法即可


### 使用方式

---
> 此jar未上传公共私服，请下载本地仓库进行引用，项目已配置本地上传组件，使用gradle的upload上传本地
> *引用方式：implementation 'com.cas:mybatis-desensitization:0.0.1'*

>配置文件开启
    在application.yml 中配置开启加解密插件

```yaml
cas:
  desensitize:
    ## 是否开启加解密插件
    enable: true
```
> 实现 com.cas.service.Desensitize 接口，里面是加解密方法的具体实现，如果不实现，插件将不处理
```java
@Configuration
public class DesensiteConfig implements Desensitize {

    @Override
    public String encryptData(String s) {
        return s + "123";
    }

    @Override
    public String decryptData(String s) {
        return s + "456";
    }
}
```

> 在需要加密的类和字段上打注解，类上使用@ConfidentialType ，属性上使用@Confidential
```java
@ConfidentialType
public class Account {

    private String id;
    /**
    * 确认要校验，长度最长为20，正则表达式满足："^\\d{1,10}$"
    */
    @Confidential(value = true, max = 20, regular = "^\\d{1,10}$")
    private String userId;
    private Float balance;
    // ...
}
```

### 参考
[源码](https://github.com/xianglong123/mybatis-desensitization)

[使用插件案例](https://github.com/xianglong123/cas-druid/blob/master/src/main/java/com/cas/bean/Account.java)


### 感谢
> 您好，如果文档能帮助到您，希望可以满足作者的小小虚荣心，在源码的项目上点一个小小的star ♥️