package com.github.webeng.BrokkoliPommes.article.api;

import com.github.webeng.BrokkoliPommes.article.domain.Article;
import com.github.webeng.BrokkoliPommes.article.service.IArticleService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "article")
public class ArticleController {

    private final IArticleService articleService;

    public ArticleController(IArticleService articleService) {
        this.articleService = articleService;
    }

    @GetMapping(path = "all", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<Article> getAllArticles() {
        return articleService.getAllArticles();
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<Article> getAllByArticlesByCategories(@RequestParam(name = "category") List<String> categories) {
        return this.articleService.getAllArticlesByCategories(categories);
    }

    @PostMapping(path = "{userId}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public Article uploadArticle(@RequestBody Article article, @PathVariable Integer userId) {
        return articleService.createArticle(article, userId);
    }

    @PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public Article updateArticle(@RequestBody Article article) {
        return articleService.updateArticle(article);
    }

    @DeleteMapping("{id}")
    public void deleteArticle(@PathVariable Integer id) {
        articleService.deleteArticle(id);
    }

}
