#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["TweetApp/TweetApp.csproj", "TweetApp/"]
RUN dotnet restore "TweetApp/TweetApp.csproj"
COPY . .
WORKDIR "/src/TweetApp"
RUN dotnet build "TweetApp.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "TweetApp.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "TweetApp.dll"]
