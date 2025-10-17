import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ImportButton } from "@/components/import/ImportButton";
import { ArrowRight, BarChart3, TrendingUp, Users } from "lucide-react";

const HomePage = async () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold tracking-tight mb-4">
            Дашборд Аналитики Продаж
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Комплексная аналитика продаж с визуализацией данных в реальном времени, отслеживанием эффективности и полезными инсайтами
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto">
          <Card>
            <CardHeader>
              <BarChart3 className="h-10 w-10 mb-2 text-primary" />
              <CardTitle>Аналитика в реальном времени</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Отслеживайте показатели продаж с обновлением данных в реальном времени и интерактивными графиками
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <TrendingUp className="h-10 w-10 mb-2 text-primary" />
              <CardTitle>Метрики эффективности</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Мониторьте KPI, тренды выручки и эффективность по категориям
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Users className="h-10 w-10 mb-2 text-primary" />
              <CardTitle>Аналитика менеджеров</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Анализируйте эффективность менеджеров и выявляйте лучших исполнителей
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/dashboard">
            <Button size="lg" className="gap-2">
              Открыть дашборд
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <ImportButton />
        </div>

        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Начало работы</CardTitle>
            </CardHeader>
            <CardContent className="text-left space-y-3">
              <p className="text-muted-foreground">
                <span className="font-semibold">1. Импорт данных:</span> Загрузите CSV файлы (продажи, менеджеры, цены) для заполнения дашборда
              </p>
              <p className="text-muted-foreground">
                <span className="font-semibold">2. Просмотр аналитики:</span> Перейдите в дашборд для просмотра детальной аналитики продаж
              </p>
              <p className="text-muted-foreground">
                <span className="font-semibold">3. Применение фильтров:</span> Настройте отображение, фильтруя данные по менеджерам, периоду или категории
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
