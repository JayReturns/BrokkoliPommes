package com.github.webeng.BrokkoliPommes.article.service;

import com.github.webeng.BrokkoliPommes.article.domain.Article;
import com.github.webeng.BrokkoliPommes.article.repository.ArticleRepository;
import com.github.webeng.BrokkoliPommes.user.service.IUserService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class ArticleService implements IArticleService {

    private final ArticleRepository articleRepository;
    private final IUserService userService;

    public ArticleService(ArticleRepository articleRepository, IUserService userService) {
        this.articleRepository = articleRepository;
        this.userService = userService;
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
    public Article createArticle(Article newArticle, Integer userId) {
        if (Objects.isNull(newArticle.getUser())) {
            newArticle.setUser(userService.getUser(userId));
        }
        return this.articleRepository.save(newArticle);
    }

    @Override
    public Article updateArticle(Article article) {
        Article fromDB = this.articleRepository.findById(article.getId()).orElseThrow();
        if (Objects.nonNull(article.getCategory()))
            fromDB.setCategory(article.getCategory());
        if (Objects.nonNull(article.getUser()))
            fromDB.setUser(article.getUser());
        if (Objects.nonNull(article.getName()))
            fromDB.setName(article.getName());
        if (Objects.nonNull(article.getDescription()))
            fromDB.setDescription(article.getDescription());
        if (Objects.nonNull(article.getPrice()))
            fromDB.setPrice(article.getPrice());

        return articleRepository.save(fromDB);
    }

    @Override
    public void deleteArticle(Integer articleId) {
        this.articleRepository.deleteById(articleId);
    }


}
