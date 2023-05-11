package com.github.webeng.BrokkoliPommes.shared.configuration;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition
public class SwaggerConfiguration {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(getInfo());
    }

    private Info getInfo() {
        return new Info()
                .title("BrokkoliPommes")
                .description("Online-Shop für WebEng II")
                .version("v1")
                .contact(getContact())
                .license(getLicense());
    }

    private Contact getContact() {
        return new Contact()
                .url("https://github.com/DHBW-Vilas/21ai2-webeng-II-brokkolipommes")
                .name("Lev Likhanov, Rafael Simon, Serbay Yavuz, Jan-Luca Wolf");
    }

    private License getLicense() {
        return new License()
                .url("https://www.gnu.de/documents/gpl-3.0.en.html")
                .name("GNU General Public License v3.0");
    }


}
