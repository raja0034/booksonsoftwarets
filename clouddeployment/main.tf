resource "azurerm_resource_group" "res-0" {
  location = "eastus"
  name     = "rg-openai2"
}
resource "azurerm_cognitive_account" "res-1" {
  custom_subdomain_name = "oai-ravinote-3"
  kind                  = "OpenAI"
  location              = "eastus"
  name                  = "oai-ravinote-3"
  resource_group_name   = "rg-openai2"
  sku_name              = "S0"
  network_acls {
    default_action = "Allow"
  }
  depends_on = [
    azurerm_resource_group.res-0,
  ]
}
resource "azurerm_cognitive_deployment" "res-2" {
  cognitive_account_id = "/subscriptions/<my-subscription-id>/resourceGroups/rg-openai2/providers/Microsoft.CognitiveServices/accounts/oai-ravinote-3"
  name                 = "key-ravinote-3"
  rai_policy_name      = "Microsoft.Default"
  model {
    format  = "OpenAI"
    name    = "gpt-35-turbo"
    version = "0613"
  }
  scale {
    type = "Standard"
  }
  depends_on = [
    azurerm_cognitive_account.res-1,
  ]
}
resource "azurerm_cognitive_deployment" "res-3" {
  cognitive_account_id = "/subscriptions/<my-subscription-id>/resourceGroups/rg-openai2/providers/Microsoft.CognitiveServices/accounts/oai-ravinote-3"
  name                 = "vec-ravinote-3"
  rai_policy_name      = "Microsoft.Default"
  model {
    format  = "OpenAI"
    name    = "text-embedding-ada-002"
    version = "1"
  }
  scale {
    type = "Standard"
  }
  depends_on = [
    azurerm_cognitive_account.res-1,
  ]
}
resource "azurerm_search_service" "res-4" {
  location            = "eastus"
  name                = "sea-ravinote-3"
  resource_group_name = "rg-openai2"
  sku                 = "standard"
  depends_on = [
    azurerm_resource_group.res-0,
  ]
}
resource "azurerm_service_plan" "res-5" {
  location            = "eastus"
  name                = "asp-web-app-chat-1"
  os_type             = "Linux"
  resource_group_name = "rg-openai2"
  sku_name            = "S1"
  tags = {
    ProjectType = "aoai-your-data-service"
  }
  depends_on = [
    azurerm_resource_group.res-0,
  ]
}
resource "azurerm_linux_web_app" "res-6" {
  app_settings = {
    AUTH_CLIENT_SECRET                           = "<my-auth-secret>"
    AZURE_COSMOSDB_ACCOUNT                       = ""
    AZURE_COSMOSDB_CONVERSATIONS_CONTAINER       = "conversations"
    AZURE_COSMOSDB_DATABASE                      = "db_conversation_history"
    AZURE_COSMOSDB_MONGO_VCORE_CONNECTION_STRING = ""
    AZURE_COSMOSDB_MONGO_VCORE_CONTAINER         = ""
    AZURE_COSMOSDB_MONGO_VCORE_CONTENT_COLUMNS   = ""
    AZURE_COSMOSDB_MONGO_VCORE_DATABASE          = ""
    AZURE_COSMOSDB_MONGO_VCORE_FILENAME_COLUMN   = ""
    AZURE_COSMOSDB_MONGO_VCORE_INDEX             = ""
    AZURE_COSMOSDB_MONGO_VCORE_TITLE_COLUMN      = ""
    AZURE_COSMOSDB_MONGO_VCORE_URL_COLUMN        = ""
    AZURE_COSMOSDB_MONGO_VCORE_VECTOR_COLUMNS    = ""
    AZURE_OPENAI_EMBEDDING_NAME                  = ""
    AZURE_OPENAI_ENDPOINT                        = "https://oai-ravinote-3.openai.azure.com/"
    AZURE_OPENAI_KEY                             = "aae5413f71f3409884eb9e34f057f39f"
    AZURE_OPENAI_MAX_TOKENS                      = "800"
    AZURE_OPENAI_MODEL                           = "key-ravinote-3"
    AZURE_OPENAI_MODEL_NAME                      = "gpt-35-turbo"
    AZURE_OPENAI_RESOURCE                        = "oai-ravinote-3"
    AZURE_OPENAI_STOP_SEQUENCE                   = ""
    AZURE_OPENAI_SYSTEM_MESSAGE                  = "You are an AI assistant that helps people find information."
    AZURE_OPENAI_TEMPERATURE                     = "0.7"
    AZURE_OPENAI_TOP_P                           = "0.95"
    AZURE_SEARCH_CONTENT_COLUMNS                 = ""
    AZURE_SEARCH_ENABLE_IN_DOMAIN                = "True"
    AZURE_SEARCH_FILENAME_COLUMN                 = ""
    AZURE_SEARCH_INDEX                           = ""
    AZURE_SEARCH_KEY                             = ""
    AZURE_SEARCH_PERMITTED_GROUPS_COLUMN         = ""
    AZURE_SEARCH_QUERY_TYPE                      = ""
    AZURE_SEARCH_SEMANTIC_SEARCH_CONFIG          = ""
    AZURE_SEARCH_SERVICE                         = ""
    AZURE_SEARCH_STRICTNESS                      = "3"
    AZURE_SEARCH_TITLE_COLUMN                    = ""
    AZURE_SEARCH_TOP_K                           = "5"
    AZURE_SEARCH_URL_COLUMN                      = ""
    AZURE_SEARCH_USE_SEMANTIC_SEARCH             = "False"
    AZURE_SEARCH_VECTOR_COLUMNS                  = ""
    DATASOURCE_TYPE                              = "AzureCognitiveSearch"
    ELASTICSEARCH_CONTENT_COLUMNS                = ""
    ELASTICSEARCH_EMBEDDING_MODEL_ID             = ""
    ELASTICSEARCH_ENABLE_IN_DOMAIN               = "True"
    ELASTICSEARCH_ENCODED_API_KEY                = ""
    ELASTICSEARCH_ENDPOINT                       = ""
    ELASTICSEARCH_FILENAME_COLUMN                = ""
    ELASTICSEARCH_INDEX                          = ""
    ELASTICSEARCH_QUERY_TYPE                     = ""
    ELASTICSEARCH_STRICTNESS                     = "3"
    ELASTICSEARCH_TITLE_COLUMN                   = ""
    ELASTICSEARCH_TOP_K                          = "5"
    ELASTICSEARCH_URL_COLUMN                     = ""
    ELASTICSEARCH_VECTOR_COLUMNS                 = ""
    SCM_DO_BUILD_DURING_DEPLOYMENT               = "true"
  }
  client_affinity_enabled = true
  https_only              = true
  location                = "eastus"
  name                    = "web-app-chat-1"
  resource_group_name     = "rg-openai2"
  service_plan_id         = "/subscriptions/<my-subscription-id>/resourceGroups/rg-openai2/providers/Microsoft.Web/serverfarms/asp-web-app-chat-1"
  tags = {
    ProjectType = "aoai-your-data-service"
  }
  auth_settings_v2 {
    auth_enabled           = true
    default_provider       = "azureactivedirectory"
    require_authentication = true
    active_directory_v2 {
      client_id                  = "24c343d7-9219-497e-8ae6-8e3db49e3771"
      client_secret_setting_name = "AUTH_CLIENT_SECRET"
      login_parameters = {
        response_type = "code id_token"
        scope         = "openid offline_access profile https://graph.microsoft.com/User.Read https://graph.microsoft.com/User.ReadBasic.All"
      }
      tenant_auth_endpoint = "https://login.microsoftonline.com/1f4c33e1-e960-43bf-a135-6db8b82b6885/v2.0"
    }
    apple_v2 {
      client_id                  = ""
      client_secret_setting_name = ""
    }
    facebook_v2 {
      app_id                  = ""
      app_secret_setting_name = ""
    }
    github_v2 {
      client_id                  = ""
      client_secret_setting_name = ""
    }
    google_v2 {
      client_id                  = ""
      client_secret_setting_name = ""
    }
    login {
      token_store_enabled = true
    }
    microsoft_v2 {
      client_id                  = ""
      client_secret_setting_name = ""
    }
    twitter_v2 {
      consumer_key                 = ""
      consumer_secret_setting_name = ""
    }
  }
  identity {
    type = "SystemAssigned"
  }
  site_config {
    ftps_state = "FtpsOnly"
    cors {
      allowed_origins = ["*"]
    }
  }
  depends_on = [
    azurerm_service_plan.res-5,
  ]
}
resource "azurerm_app_service_custom_hostname_binding" "res-11" {
  app_service_name    = "web-app-chat-1"
  hostname            = "web-app-chat-1.azurewebsites.net"
  resource_group_name = "rg-openai2"
  depends_on = [
    azurerm_linux_web_app.res-6,
  ]
}
