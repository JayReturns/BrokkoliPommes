package com.github.webeng.BrokkoliPommes.article.service;

import com.github.webeng.BrokkoliPommes.article.domain.Article;
import com.github.webeng.BrokkoliPommes.article.repository.ArticleRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ArticleService implements IArticleService {

    private final ArticleRepository articleRepository;

    public ArticleService(ArticleRepository articleRepository) {
        this.articleRepository = articleRepository;
    }


    @Override
    public List<Article> getAllArticles() {
        return this.articleRepository.findAll();
    }

    @Override
    public List<Article> getAllArticlesByCategories(List<String> categories) {
        return this.articleRepository.findArticlesByCategoryIn(categories);
    }

    @Override
    public Article createArticle(Article newArticle) {
        return this.articleRepository.save(newArticle);
    }

    @Override
    public Article updateArticle(Article article) {
        Article fromDB = this.articleRepository.findById(article.getId()).orElseThrow();
        fromDB.setCategory(article.getCategory());
        fromDB.setUser(article.getUser());
        fromDB.setName(article.getName());
        fromDB.setDescription(article.getDescription());
        fromDB.setPrice(article.getPrice());

        return articleRepository.save(fromDB);
    }
}
