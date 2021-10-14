nest-test-drive
===============

Taking Nest for a spin!

Requirements
------------

-	[x] global prefix /api
-	[x] health check endpoint
-	[x] validation
	-	[x] body
	-	[x] header
	-	[x] query params
	-	[x] custom response format
-	[x] typeorm
-	[ ] tests
-	[x] documentation
-	[x] wrap all responses with { data: [...] }

References
----------

-	https://docs.nestjs.com/
-	https://docs.nestjs.com/faq/global-prefix
-	https://docs.nestjs.com/controllers
	-	For quickly creating a CRUD controller with the validation built-in, you may use the CLI's CRUD generator: nest g resource [name].
-	https://docs.nestjs.com/recipes/sql-typeorm
-	https://docs.nestjs.com/openapi/introduction
-	Testing
	-	https://github.com/jmcdo29/testing-nestjs/tree/master/apps
	-	https://wanago.io/2020/07/13/api-nestjs-testing-services-controllers-integration-tests/
