package com.github.webeng.BrokkoliPommes.article.repository;

import com.github.webeng.BrokkoliPommes.article.domain.Article;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Integer> {

    List<Article> findArticlesByCategoryIn(Collection<String> categories);

    @Query("SELECT DISTINCT a.category FROM Article a")
    List<String> getAllCategories();

}
