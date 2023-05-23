package com.github.webeng.BrokkoliPommes.article.service;

import com.github.webeng.BrokkoliPommes.article.domain.Article;

import java.util.List;

public interface IArticleService {

    List<Article> getAllArticles();

    List<Article> getAllArticlesByCategories(List<String> categories);

    Article createArticle(Article newArticle);

    Article updateArticle(Article article);

}
